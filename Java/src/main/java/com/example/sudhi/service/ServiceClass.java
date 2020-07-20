package com.example.sudhi.service;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.text.WordUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.sudhi.dbconn.DbConnection;
import com.example.sudhi.exception.DataNotFoundException;
import com.example.sudhi.model.Consumption;
import com.example.sudhi.model.FinalStock;
import com.example.sudhi.model.NewConsumption;
import com.example.sudhi.model.NewPurchase;
import com.example.sudhi.model.Purchase;
import com.example.sudhi.model.SortByProductname;
import com.example.sudhi.model.Stock;
import com.example.sudhi.model.Stock2;
import com.example.sudhi.repository.ConsumptionRepository;
import com.example.sudhi.repository.PurchaseRepository;




@Service
public class ServiceClass {

	
	@Autowired
	PurchaseRepository purchaseRepository;
	
	@Autowired
	ConsumptionRepository consumptionRepository;
	
	
	private static List<Purchase> completePurchaseList=new ArrayList<Purchase>();
	
	private static List<NewConsumption> consumptionListByDate=new ArrayList<NewConsumption>();
	
	private static List<NewConsumption> consumptionListByDateAndName=new ArrayList<NewConsumption>();


	/* Service method to add purchase data*/
	  public void addPurchaseData(Purchase pdata) { 
		String productname=WordUtils.capitalizeFully( pdata.getProductname());
		
		String vendorname=WordUtils.capitalizeFully(pdata.getVendorname());
		
		//System.out.println("Product name iis"+productname+" vendorname is "+vendorname);
		pdata.setProductname(productname);
		pdata.setVendorname(vendorname);
		  purchaseRepository.save(pdata);
	  
	  }
	  
	  /*Service method to get all purchase data*/
	  public List<Purchase> fetchPurchase(){
		  return purchaseRepository.findAllPurchases();
	  }
	 
		/* Service method to add consumption data*/
		public void addConsumptionData(Consumption cdata)  {
			String productname=WordUtils.capitalizeFully( cdata.getProductname());
			cdata.setProductname(productname);
			
			//System.out.println("Cdata productname "+productname);
			consumptionRepository.save(cdata);				
		}
	
	/* This is for getting all purchases based on vendor names */
	public List<Purchase> getPurchasesByVendorName(String vendorname,String fromdate,String todate){
		
		List<Purchase> pList=purchaseRepository.findByVendorname(vendorname,fromdate,todate);
		
		ServiceClass.completePurchaseList=pList;
		
//		for(Purchase p:pList) {
//			System.out.println(p.toString());
//		}
		
		if(pList.size()<1) {
			return null;
		}else {
			return pList;
		}		
	}
	
	public  List<Purchase> getPurchaseList()
	{
		return completePurchaseList;
	}
	
	
	/* This is for getting vendor names on typing characters*/
	  public List<String> getVendorNames(String vendorNames)
	  {
	  List<String> vendors=purchaseRepository.findVendors(vendorNames);
	  List<String> newVendors = new ArrayList<String>();
	  
	  for (String vendor : vendors) 
	  { 
		  if (!newVendors.contains(vendor))
		  {
			  newVendors.add(vendor);
			  } 
		  } 
	  return newVendors;  
	  }
	 
	 /*This is for getting product names from consumption table upon entering a key at search*/
	  public List<String> getProductNames(String prodName){
			
			List<String> products=purchaseRepository.findProducts(prodName);
			ArrayList<String> newProducts = new ArrayList<String>();
			
			for (String product : products) { 
	            if (!newProducts.contains(product)) { 
	  
	            	newProducts.add(product); 
	            } 
	        } 
			
			return newProducts;
		}
	  
	  /*Service method to get all consumption data*/
	  public List<Consumption> fetchConsumption(){
		  return consumptionRepository.findAllConsumption();
	  }
	
	  
	  public List<NewConsumption> getConsumptionDataByDate(String fromdate,String todate){
		  
			 DbConnection dbc=new DbConnection();			 
			 
			List<NewConsumption> cList= dbc.getConsumptionDataByDate( fromdate, todate);
			
			ServiceClass.consumptionListByDate=cList;
		
				return cList;				
	  }

	  public  List<NewConsumption> getConsumptionListByDate()
		{
			return consumptionListByDate;
		}
	  
	  public List<NewConsumption> getConsumptionDataByDateAndName(String productname,String fromdate,String todate){
		  
			 DbConnection dbc=new DbConnection();			 
			 
			List<NewConsumption> cList= dbc.getConsumptionDataByDateAndName(productname, fromdate, todate);	  
			
			ServiceClass.consumptionListByDateAndName=cList;
			
			return cList;				
	  }
	  
	  public  List<NewConsumption> getConsumptionListByDateAndName()
		{
			return consumptionListByDateAndName;
		}
	  
	  
	  
	  public List<Stock2> fetchCompleteList() throws ParseException {
		  
		 SecondServiceClass secondServiceClass=new SecondServiceClass();
		 
		 DbConnection dbc=new DbConnection();
		 
		  List<String> dates=new ArrayList<String>();
		  
		  List<NewPurchase> purchaseList=dbc.connectToNewPurchase();

		  List<NewConsumption> consumptionList=dbc.connectToNewConsumption();

		  
		  //List<Purchase> purchaseList=purchaseRepository.findAllPurchases();
		  
		  
			  
		  //List<Consumption> consumptionList=consumptionRepository.findAllConsumption();
		  
		 
		  
		 Date beginDate= getFirstDate(purchaseList.get(0).getDate().toString(), consumptionList.get(0).getDateofconsumption().toString());
		  
		 Date endDate=getLastDate(purchaseList.get(purchaseList.size()-1).getDate().toString(), consumptionList.get(consumptionList.size()-1).getDateofconsumption().toString());
		  
		 
		 
//		  SimpleDateFormat  format = new SimpleDateFormat("yyyy/MM/dd");
//		  
//		  Date start=format.parse(beginDate);
//		  Date end=format.parse(endDate);
	       
	       
	       dates=convertDateToList(beginDate,endDate);
	       
//	       for(String dt:dates) {
//	    	   System.out.println(dt);
//	       }

	
		  List<Stock> stockList=new ArrayList<Stock>();
		  

		  
		
			for(String date:dates) 
			{
				 // System.out.println("date from setting stocklist using purchase loop here "+date);
				  for(int i=0;i<purchaseList.size();i++) 
				  {
				  Stock st=new Stock();
				  String purchaseDate = purchaseList.get(i).getDate().toString();
				  
				  if(purchaseDate.equals(date)) {
					  st.setDate(date);
					  st.setProductname(purchaseList.get(i).getProductname());
					  st.setGoodsreceived(purchaseList.get(i).getQuantity());
					  
					  for(int j=0;j<consumptionList.size();j++) 
					  {
						  String consumptionDate=consumptionList.get(j).getDateofconsumption().toString();
						  
						  if(consumptionDate.equals(purchaseDate)&&  ((consumptionList.get(j).getProductname()).equals(purchaseList.get(i).getProductname()))) {
							  st.setConsumedquantity(consumptionList.get(j).getConsumedquantity());
						  }else {
							  //break;
							  continue;
						  }
					  }
				  }else {
					  continue;
					  //code this part		
				  }
			  stockList.add(st);
			  }
			}	  
				  
			//check here onwards
					
			
			for(String date:dates) 
			{
				for(int i=0;i<consumptionList.size();i++) 
					{
						Stock sk=new Stock();
						String consumptionDate=consumptionList.get(i).getDateofconsumption().toString();
						String consumedProduct=consumptionList.get(i).getProductname();
						float consumedQuantity=consumptionList.get(i).getConsumedquantity();
						
						if(consumptionDate.equals(date)) {
							for(int j=0;j<stockList.size();j++) {
								//System.out.println("stockList.get(j).getDate() "+stockList.get(j).getDate()+" stockList.get(j).getProductname() "+stockList.get(j).getProductname()+" stockList.get(j).getConsumedquantity() "+stockList.get(j).getConsumedquantity());
								if((stockList.get(j).getDate())==null) {
									continue;
								}
									
								
								if(  (stockList.get(j).getDate())!=consumptionDate  &&    (stockList.get(j).getProductname()).equals(consumedProduct)   &&  (stockList.get(j).getConsumedquantity())==0      ) {
									sk.setDate(date);
									sk.setProductname(consumedProduct);
									sk.setConsumedquantity(consumedQuantity);
									sk.setGoodsreceived(0);
								}else {
									continue;
								}
							}
						}else {
							continue;
						}
						stockList.add(sk);
					}				
			}
			
		  stockList.removeIf(s->(s.getDate()==null));
		  
		  
//		  for(int i=0;i<stockList.size();i++) {
//			  for(int j=i+1;j<stockList.size()-1;j++) {
//				  if(  stockList.get(i).getDate().equals(stockList.get(j).getDate())  && stockList.get(i).getProductname().equals(stockList.get(j).getProductname()     )   )
//			  }
//		  }
		  
		 stockList= removeDuplicatesFromStockList(stockList);
			
		  
		  

		  List<Stock2> stock2list=secondServiceClass.sortListBasedOnDate(stockList);
		 return stock2list;
		  
	  } 
	  

	private Date getFirstDate(String first,String second) throws ParseException {
		  SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	        Date firstDate= sdf.parse(first);
	        Date secondDate = sdf.parse(second);
	        Date returnDate=new Date();
	  
	       //System.out.println("Date 1"+firstDate+" date 2"+secondDate);

	        if (firstDate.before(secondDate) ) {
	        		returnDate= firstDate;	        
	        } else if (secondDate.before(firstDate) ) {
	            returnDate= secondDate;
	        } else if (firstDate.compareTo(secondDate) == 0) {
	            returnDate= firstDate;
	        } else {
	            System.out.println("How to get here?");
	        }
	        return returnDate;
	  }
	  
	  
	  
	
	  private Date getLastDate(String first,String last) throws ParseException {
		  SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	        Date firstDate = sdf.parse(first);
	        Date secondDate = sdf.parse(last);
	        Date returnDate=new Date();
	  
	       //System.out.println("Date 1"+firstDate+" date 2"+secondDate);

	        if (firstDate.after(secondDate) ) {
	        		returnDate= firstDate;	        
	        } else if (secondDate.after(firstDate) ) {
	            returnDate= secondDate;
	        } else if (firstDate.compareTo(secondDate) == 0) {
	            returnDate= firstDate;
	        } else {
	            System.out.println("How to get here?");
	        }
	        return returnDate;
	  }
	  
	 

	public List<String> convertDateToList(Date startDate, Date endDate) 
	{
		List<Date> dates = new ArrayList<Date>();
		
		List<String> dateList=new ArrayList<String>();
		
		  long interval = 24*1000 * 60 * 60; // 1 hour in millis
		  long curTime = startDate.getTime();
		  long endTime =endDate.getTime() ; // create your endtime here, possibly using Calendar or Date
		  SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd"); ;
		  
		  while (curTime <= endTime) {
		      dates.add(new Date(curTime));
		      curTime += interval;
		  }
  
		  for(int i=0;i<dates.size();i++){
		      Date lDate =(Date)dates.get(i);
		      String ds = formatter.format(lDate);
		      dateList.add(ds);
		  }
		return dateList;
	}
	
	private List<Stock> removeDuplicatesFromStockList(List<Stock> stockList) {


		for(int i=0;i<stockList.size()-1;i++) {
			
			for(int j=i+1;j<stockList.size();j++) {
				
				if(stockList.get(i).getDate().equals(stockList.get(j).getDate())  && stockList.get(i).getProductname().equals(stockList.get(j).getProductname()) &&  stockList.get(i).getConsumedquantity()== stockList.get(j).getConsumedquantity() &&  stockList.get(j).getGoodsreceived()==0   ) {
					stockList.remove(j);
				}
			}			
		}
		return stockList;
		
        
//        System.out.println("Stock list \n");
//		System.out.println(" Date \t\t product name \t goodsreceived \t  consumedquantity\t");
//		for(Stock sk:stockList) {
//			System.out.println(sk.getDate()+"\t\t"+sk.getProductname()+"\t\t\t"+sk.getGoodsreceived()+"\t\t\t\t"+sk.getConsumedquantity()+"\n");
//		}
        
	}
	
	
	/*This method is for returning filtered list based on product name*/
	public List<FinalStock> filterFinalStockList(List<FinalStock> finalStockList,String productname){
		
		List<FinalStock> filteredList=new ArrayList<FinalStock>();
		
		for(int i=0;i<finalStockList.size();i++) {
			if(finalStockList.get(i).getProductname().equalsIgnoreCase(productname)) {
				filteredList.add(finalStockList.get(i));
			}
		}
		
		if(filteredList.size()==0) {
			throw new DataNotFoundException("No data found");
		}
		
		return filteredList;
	}
	
	
	/*This method is for returning filtered list based on product name*/
	public List<FinalStock> sortFinalStockListByProductName(List<FinalStock> finalStockList){
		
		//List<FinalStock> filteredList=new ArrayList<FinalStock>();
		
		Collections.sort(finalStockList, new SortByProductname());
		
		for (int i=0; i<finalStockList.size(); i++) {
			finalStockList.get(i);
    } 
		
		
		return finalStockList;
	}
	
}
