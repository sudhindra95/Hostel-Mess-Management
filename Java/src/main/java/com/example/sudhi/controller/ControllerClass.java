package com.example.sudhi.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


import com.example.sudhi.exception.DataNotFoundException;
import com.example.sudhi.model.Consumption;
import com.example.sudhi.model.FinalStock;
import com.example.sudhi.model.NewConsumption;
import com.example.sudhi.model.Purchase;
import com.example.sudhi.model.Stock2;
import com.example.sudhi.service.EditedData;
import com.example.sudhi.service.ExcelCreation;
import com.example.sudhi.service.SecondServiceClass;
import com.example.sudhi.service.ServiceClass;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@CrossOrigin(origins = "*")
public class ControllerClass {

	ObjectMapper objectMapper = new ObjectMapper();
	
	@Autowired
	ServiceClass serviceClass;
	
	@Autowired
	SecondServiceClass secServClass;
	
	@Autowired
	EditedData ed;
	
	
	ExcelCreation excelCreation=new ExcelCreation();
	
	/*1. Add purchase details such as billnumber,productname,vendorname etc */
	@RequestMapping(value="/register/{amountString}", method=RequestMethod.POST)
	public @ResponseBody ResponseEntity<String> addPurchaseData(@RequestParam ("formdata") String str,@PathVariable("amountString") String amountString) throws JsonMappingException, IOException {

		float amount=Float.parseFloat(amountString);
		String jsonString=str;
		Purchase pData  = objectMapper.readValue(jsonString,Purchase.class);
		
		pData.setAmount(amount);
			
		serviceClass.addPurchaseData(pData);
		
		
		return ResponseEntity.ok("Success");
	}
	
	/*2. Add consumption details such as productname, consumed quantity,date of consumption  etc */
	@RequestMapping(value="/addConsumptionDetails", method=RequestMethod.POST)
	public @ResponseBody ResponseEntity<String> addConsumptionData(@RequestParam ("formdata") String str) throws JsonMappingException, IOException {
		String jsonString=str;
		Consumption cData  = objectMapper.readValue(jsonString,Consumption.class);
		
		serviceClass.addConsumptionData(cData);
		
		return ResponseEntity.ok("Success");
	}

	
	 /*3. Get vendor names suggestions when on typing */
	  @RequestMapping(value="/webapp/getVendors/{vendorName}",method =
	  RequestMethod.GET) public @ResponseBody ResponseEntity<List<String>>
	  displayData(@PathVariable ("vendorName") String vendorName) {
	  
	  List<String> vendor_list=serviceClass.getVendorNames(vendorName);
	  
	  return new ResponseEntity<List<String>>(vendor_list, HttpStatus.OK); }
	 
	  
	  /*4. Search all purchase details using vendor name */
	@RequestMapping(value="/getPurchase/{vendorName}",method = RequestMethod.GET)
	public List<Purchase> getPurchase(@PathVariable ("vendorName") String vendorname,@RequestParam(value = "fromdate", required = true) String fromdate, @RequestParam(value = "todate", required = true) String todate){
		
				List<Purchase> purchaseList=serviceClass.getPurchasesByVendorName(vendorname,fromdate,todate);
	
				return  purchaseList;
	}
	
	/*5. Get complete purchase list */
	@RequestMapping(value="/getAllPurchase",method = RequestMethod.GET)
	public List<Purchase> getAllPurchase(){
		
				List<Purchase> purchaseList=serviceClass.fetchPurchase();
				
				if(purchaseList.size()==0) {
					throw new DataNotFoundException("No records found");
				}
				
//				for(int i=0;i<purchaseList.size();i++) {
//				System.out.println(purchaseList.get(i).toString());
//				}
				return  purchaseList;
	}
	
	/*6. Get complete consumption list */
	@RequestMapping(value="/getAllConsumption",method = RequestMethod.GET)
	public List<Consumption> getAllConsumption(){
		
				List<Consumption> consumptionList=serviceClass.fetchConsumption();
				
				if(consumptionList.size()==0) {
					throw new DataNotFoundException("No records found");
				}
				
//				for(int i=0;i<purchaseList.size();i++) {
//				System.out.println(purchaseList.get(i).toString());
//				}
				return  consumptionList;
	}
	
	
	/*7.Get name of products from consumption table on typing characters for product name*/
	@RequestMapping(value="/webapp/getAllProducts/{productName}",method = RequestMethod.GET)
	public @ResponseBody ResponseEntity<List<String>> getProductData(@PathVariable ("productName") String productName) {
	
//		System.out.println("Product name typed"+productName);
		
	List<String> product_list=serviceClass.getProductNames(productName);

	return new ResponseEntity<List<String>>(product_list, HttpStatus.OK);
}
	
	
	/*8.Get consumption data of product by date*/
	@RequestMapping(value="/getConsumptionDetails", method=RequestMethod.GET)
	public List<NewConsumption> getConsumption( @RequestParam(value = "pname", required = false) String productName,
     @RequestParam(value = "fromdate", required = true) String fromdate, @RequestParam(value = "todate", required = true) String todate){

		fromdate=fromdate.replaceAll("-", "/");
		todate=todate.replaceAll("-", "/");
		
		//System.out.println("Productname "+productName+", "+fromdate+"  "+todate);
		List<NewConsumption> returnList=new ArrayList<NewConsumption>();
		
		if(productName=="" || productName==null) {
			returnList= serviceClass.getConsumptionDataByDate(fromdate, todate);
		}else {
			returnList= serviceClass.getConsumptionDataByDateAndName(productName, fromdate, todate);
		}
		
		
		if(returnList.size()==0) {
			throw new DataNotFoundException("No record found");
		}
		
		return returnList;
	}
	
	
	/* 9. stock list */
	@RequestMapping(value="/stock", method=RequestMethod.GET)
	public List<FinalStock> stockData(@RequestParam(value="fromdate") String fromdate,@RequestParam(value="todate") String todate) throws JsonMappingException, IOException {
		
		List<FinalStock> finalList=new ArrayList<FinalStock>();
		
		try {
			
			List<Stock2> dataList=serviceClass.fetchCompleteList();
			finalList=secServClass.getRequiredData(dataList,fromdate,todate);
			return finalList;
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
		return null;
	}
	
	
	/*10. filtering stock register list*/
	@RequestMapping(value="/filteredList", method=RequestMethod.GET)
	public List<FinalStock> getFilteredList(@RequestParam(value="productname") String productname){
		
		List<FinalStock> finalstockList=secServClass.getFinalList();
		
		return serviceClass.filterFinalStockList(finalstockList, productname);
		
	}
	
	/*11. Sorting stock register list by product name*/
	@RequestMapping(value="/sortListByName", method=RequestMethod.GET)
	public List<FinalStock> getSortedFinalListByName(){
		
		List<FinalStock> finalstockList=secServClass.getFinalList();
		
		 return serviceClass.sortFinalStockListByProductName(finalstockList);
		
	}
	
	/*12.Adding edited purchase list*/
	@RequestMapping(value="/addEditedPurchase", method=RequestMethod.POST)
	public @ResponseBody ResponseEntity<String> addEditedPurchaseData(@RequestParam ("formdata") String strlist) throws JsonMappingException, IOException {
		//@RequestBody
		
			try {
				ed.getEditedPurchaseList(strlist);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	
		
		return ResponseEntity.ok("Success");
	}
	
	
	/*13.Adding edited consumption list*/
	@RequestMapping(value="/addEditedConsumption", method=RequestMethod.POST)
	public @ResponseBody ResponseEntity<String> addEditedConsumptionData(@RequestParam ("formdata") String strlist) throws JsonMappingException, IOException {
		//@RequestBody
		
			try {
				ed.getEditedConsumptionList(strlist);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	
		
		return ResponseEntity.ok("Success");
	}
	
	/*14. Downloading stock register excel file */
	@RequestMapping(value="/webapp/downloadStockReport",method=RequestMethod.GET)
	public ResponseEntity<Object> downloadStockExcelFile() throws IOException{
		try {
			ExcelCreation ec=new ExcelCreation();
			List<FinalStock>fsList=secServClass.getFinalList();
			ec.writeStockExcel(fsList);
			String filePath = excelCreation.getStockFileName();
			
			File downloadFile = new File(filePath);
		
		//System.out.println("The file to be downloaded is : "+downloadFile.getName());
		
		InputStreamResource resource=new InputStreamResource(new FileInputStream(downloadFile));
		
		HttpHeaders headers = new HttpHeaders();
		
		headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", downloadFile.getName()));
		headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
		headers.add("Pragma", "no-cache");
		headers.add("Expires", "0");
		
		ResponseEntity<Object> responseEntity = ResponseEntity.ok().headers(headers).contentLength(downloadFile.length()).contentType(MediaType.parseMediaType("application/txt")).body(resource);
		
		
		downloadFile.deleteOnExit();
		
		return responseEntity;
		}catch(Exception e) {
		return new ResponseEntity<>("File Not Found", HttpStatus.INTERNAL_SERVER_ERROR);	
		}
	}
	
	
	
	/*15.  Downloading purchase register excel file */
	@RequestMapping(value="/webapp/downloadPurchaseReport",method=RequestMethod.GET)
	public ResponseEntity<Object> downloadPurchaseExcelFile() throws IOException{
		try {
			ExcelCreation ec=new ExcelCreation();
			List<Purchase> pList=serviceClass.getPurchaseList();
			ec.writePurchaseExcel(pList);
			String filePath = excelCreation.getPurchaseFileName();
			
			File downloadFile = new File(filePath);
		
		//System.out.println("The file to be downloaded is : "+downloadFile.getName());
		
		InputStreamResource resource=new InputStreamResource(new FileInputStream(downloadFile));
		
		HttpHeaders headers = new HttpHeaders();
		
		headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", downloadFile.getName()));
		headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
		headers.add("Pragma", "no-cache");
		headers.add("Expires", "0");
		
		ResponseEntity<Object> responseEntity = ResponseEntity.ok().headers(headers).contentLength(downloadFile.length()).contentType(MediaType.parseMediaType("application/txt")).body(resource);
		
		downloadFile.deleteOnExit();

		return responseEntity;
		}catch(Exception e) {
		return new ResponseEntity<>("File Not Found", HttpStatus.INTERNAL_SERVER_ERROR);	
		}
	}
		
		/*16.  Downloading consumption register excel file */
		@RequestMapping(value="/webapp/downloadConsumptionReport/{productName}",method=RequestMethod.GET)
		public ResponseEntity<Object> downloadConsumptionExcelFile(@PathVariable ("productName") String productName) throws IOException{
			try {
				ExcelCreation ec=new ExcelCreation();
				String filepath=new String();
				
				
				if(productName.equals("allProducts")) {

					List<NewConsumption> cListByDate=serviceClass.getConsumptionListByDate();
					ec.writeConsumptionExcelByDate(cListByDate);
					
					filepath = excelCreation.getConsumptionFileNameByDate();
				}else {
					
					List<NewConsumption> cListByDateAndName=serviceClass.getConsumptionListByDateAndName();
					ec.writeConsumptionExcelByDateAndName(cListByDateAndName,productName);
					filepath = excelCreation.getConsumptionFileNameByDateAndName();
				}
				
				
				File downloadFile = new File(filepath);
			
			//System.out.println("The file to be downloaded is : "+downloadFile.getName());
			
			InputStreamResource resource=new InputStreamResource(new FileInputStream(downloadFile));
			
			HttpHeaders headers = new HttpHeaders();
			
			headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", downloadFile.getName()));
			headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
			headers.add("Pragma", "no-cache");
			headers.add("Expires", "0");
			
			ResponseEntity<Object> responseEntity = ResponseEntity.ok().headers(headers).contentLength(downloadFile.length()).contentType(MediaType.parseMediaType("application/txt")).body(resource);
			
			downloadFile.deleteOnExit();

			return responseEntity;
			}catch(Exception e) {
			return new ResponseEntity<>("File Not Found", HttpStatus.INTERNAL_SERVER_ERROR);	
			}
	}
		
}
