package com.example.sudhi.service;



import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.StringTokenizer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.sudhi.dbconn.DbConnection;
import com.example.sudhi.exception.DataNotFoundException;
import com.example.sudhi.model.Consumption;
import com.example.sudhi.model.DummyConsumption;
import com.example.sudhi.model.DummyPurchase;
import com.example.sudhi.model.Purchase;
import com.example.sudhi.repository.ConsumptionRepository;
import com.example.sudhi.repository.PurchaseRepository;

@Service
public class EditedData {
	
	@Autowired
	PurchaseRepository purchaseRepository;
	
	@Autowired
	ConsumptionRepository consumptionRepository;

	public void getEditedPurchaseList(String strlist) throws ParseException {
		
		int endindex=strlist.length()-1;
		int endindex1=strlist.length()-2;
		StringBuilder sb=new StringBuilder(strlist);
		sb.deleteCharAt(endindex);
		sb.deleteCharAt(endindex1);
		sb.deleteCharAt(0);
			//System.out.println("String buffer "+sb);

			String stringlist=sb.toString().replaceAll("\\[", "").replaceAll("\"","");
			
			String[] values=stringlist.split("],");
			
			List<String> myList = new ArrayList<String>(Arrays.asList(values));
			
			
			List<Purchase> plist=new ArrayList<>();
			
			for(int i=0;i<myList.size();i++) {
				
				StringTokenizer tokenizer = new StringTokenizer(myList.get(i), ",");
				while (tokenizer.hasMoreTokens()) {
					Purchase p=new Purchase();
					p.setBillnumber(Integer.parseInt(tokenizer.nextToken()));
					p.setProductname(tokenizer.nextToken());
					p.setVendorname(tokenizer.nextToken());
					SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd"); 
					Date dt=formatter.parse(tokenizer.nextToken());
					java.sql.Date sqlDate = new java.sql.Date(dt.getTime());
					p.setDate(sqlDate);
					p.setPrice(Float.parseFloat(tokenizer.nextToken()));
					p.setQuantity(Float.parseFloat(tokenizer.nextToken()));
					p.setAmount(Float.parseFloat(tokenizer.nextToken()));
					plist.add(p);

					//System.out.println(tokenizer.nextToken());
					//can add exception here
		        }  


				//System.out.println("\n");
				
			}

			compareAndPersistToDb(plist);

	}
	
	
	public void compareAndPersistToDb(List<Purchase> plist) {
		List<Purchase> purchaseList=purchaseRepository.getAllPurchases();
		
		if(purchaseList.size()==0) {
			 throw new DataNotFoundException("No record found");
		}
		
		List<DummyPurchase> newPurchaseList=new ArrayList<>();
		
		DbConnection db=new DbConnection();
		
		for(int i=0;i<plist.size();i++) {
			
			DummyPurchase p=new DummyPurchase();
			if(purchaseList.get(i).getBillnumber() != plist.get(i).getBillnumber()) {
				p.setBillnumber(plist.get(i).getBillnumber());
			}

			if(!purchaseList.get(i).getProductname().toLowerCase().equals(plist.get(i).getProductname().toLowerCase())) {
				p.setProductname(plist.get(i).getProductname());
			}

			
			if(!purchaseList.get(i).getVendorname().toLowerCase().equals(plist.get(i).getVendorname().toLowerCase())) {
				p.setVendorname(plist.get(i).getVendorname());
			}

			
			if(purchaseList.get(i).getDate().compareTo(plist.get(i).getDate())!=0   ) {
				p.setDate(plist.get(i).getDate());
			}

			if(purchaseList.get(i).getPrice() != plist.get(i).getPrice()) {
				p.setPrice(plist.get(i).getPrice());
			}

			if(purchaseList.get(i).getQuantity() != plist.get(i).getQuantity()) {
				p.setQuantity(plist.get(i).getQuantity());
			}

			if(purchaseList.get(i).getAmount() != plist.get(i).getAmount()) {
				p.setAmount(plist.get(i).getAmount());
			}

			
			newPurchaseList.add(p);
		}
		
		
		for(int i=0;i<newPurchaseList.size();i++) {
			
			if(newPurchaseList.get(i).getBillnumber()!=0 || newPurchaseList.get(i).getProductname()!=null || newPurchaseList.get(i).getVendorname()!=null || newPurchaseList.get(i).getDate()!=null || newPurchaseList.get(i).getPrice()!=0 || newPurchaseList.get(i).getQuantity()!=0 || newPurchaseList.get(i).getAmount()!=0) {
				newPurchaseList.get(i).setPurchaseid(i+1);
			}
	}
		
		//removing list entry with nulls and zeroes	
		List<DummyPurchase> newEditedPurchaseList=new ArrayList<>();
		
	for(int i=0;i<newPurchaseList.size();i++) {

			
			if(newPurchaseList.get(i).getBillnumber()==0 &&  newPurchaseList.get(i).getProductname()==null && newPurchaseList.get(i).getVendorname()==null && newPurchaseList.get(i).getDate()==null && newPurchaseList.get(i).getPrice()==0 && newPurchaseList.get(i).getQuantity()==0 && newPurchaseList.get(i).getAmount()==0) {
				
			}else {
				//newPurchaseList.get(index)
				newEditedPurchaseList.add(newPurchaseList.get(i));
			}
		}
	
	
	for(int i=0;i<newEditedPurchaseList.size();i++) {
		
		int index=newEditedPurchaseList.get(i).getPurchaseid()-1;
		
		if(newEditedPurchaseList.get(i).getBillnumber()==0){			
			newEditedPurchaseList.get(i).setBillnumber( purchaseList.get(index).getBillnumber());
		}
		
		if(newEditedPurchaseList.get(i).getProductname()==null) {
			newEditedPurchaseList.get(i).setProductname(purchaseList.get(index).getProductname());
		}
		
		if(newEditedPurchaseList.get(i).getVendorname()==null) {
			newEditedPurchaseList.get(i).setVendorname(purchaseList.get(index).getVendorname());
		}
		
		if(newEditedPurchaseList.get(i).getDate()==null) {
			newEditedPurchaseList.get(i).setDate(purchaseList.get(index).getDate());
		}
		
		if(newEditedPurchaseList.get(i).getPrice()==0) {
			newEditedPurchaseList.get(i).setPrice(purchaseList.get(index).getPrice());
		}
		
		if(newEditedPurchaseList.get(i).getQuantity()==0) {
			newEditedPurchaseList.get(i).setQuantity(purchaseList.get(index).getQuantity());
		}
		
		if(newEditedPurchaseList.get(i).getAmount()==0) {
			newEditedPurchaseList.get(i).setAmount(purchaseList.get(index).getAmount());
		}
	}
		
	
	//System.out.println("New purchase list");
	for(int i=0;i<newEditedPurchaseList.size();i++) {
		//System.out.println(newEditedPurchaseList.toString());
		db.updatePurchase(newEditedPurchaseList.get(i).getPurchaseid(), newEditedPurchaseList.get(i).getBillnumber(), newEditedPurchaseList.get(i).getProductname(), newEditedPurchaseList.get(i).getVendorname(), newEditedPurchaseList.get(i).getDate(), newEditedPurchaseList.get(i).getPrice(), newEditedPurchaseList.get(i).getQuantity(), newEditedPurchaseList.get(i).getAmount());

	}
		
	}
	
	
public void getEditedConsumptionList(String strlist) throws ParseException {
		
		int endindex=strlist.length()-1;
		int endindex1=strlist.length()-2;
		StringBuilder sb=new StringBuilder(strlist);
		sb.deleteCharAt(endindex);
		sb.deleteCharAt(endindex1);
		sb.deleteCharAt(0);
			//System.out.println("String buffer "+sb);

			String stringlist=sb.toString().replaceAll("\\[", "").replaceAll("\"","");
			
			String[] values=stringlist.split("],");
			
			List<String> myList = new ArrayList<String>(Arrays.asList(values));
			
			
			List<Consumption> clist=new ArrayList<>();
			
			for(int i=0;i<myList.size();i++) {
				
				StringTokenizer tokenizer = new StringTokenizer(myList.get(i), ",");
				while (tokenizer.hasMoreTokens()) {
					Consumption c=new Consumption();
					
					SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd"); 
					Date dt=formatter.parse(tokenizer.nextToken());
					java.sql.Date sqlDate = new java.sql.Date(dt.getTime());
					c.setDateofconsumption(sqlDate);
					c.setProductname(tokenizer.nextToken());
					c.setConsumedquantity(Float.parseFloat(tokenizer.nextToken()));
					
					clist.add(c);

					//System.out.println(tokenizer.nextToken());
					//can add exception here
		        }  


				//System.out.println("\n");
				
			}

			compareAndPersistConsumptionToDb(clist);

	}
	
	
	public void compareAndPersistConsumptionToDb(List<Consumption> clist) {
		List<Consumption> consumptionList=consumptionRepository.getAllConsumptions();
		
		if(consumptionList.size()==0) {
			 throw new DataNotFoundException("No record found");
		}
		
		List<DummyConsumption> newConsumptionList=new ArrayList<>();
		
		DbConnection db=new DbConnection();
		
		for(int i=0;i<clist.size();i++) {
			
			DummyConsumption c=new DummyConsumption();
			if(consumptionList.get(i).getDateofconsumption().compareTo(clist.get(i).getDateofconsumption())!=0   ) {
				c.setDateofconsumption(clist.get(i).getDateofconsumption());
			}

			if(!consumptionList.get(i).getProductname().toLowerCase().equals(clist.get(i).getProductname().toLowerCase())) {
				c.setProductname(clist.get(i).getProductname());
			}

			if(consumptionList.get(i).getConsumedquantity() != clist.get(i).getConsumedquantity()) {
				c.setConsumedquantity(clist.get(i).getConsumedquantity());
			}

			
			newConsumptionList.add(c);
		}
		
		
		for(int i=0;i<newConsumptionList.size();i++) {
			
			if(newConsumptionList.get(i).getDateofconsumption()!=null ||  newConsumptionList.get(i).getProductname()!=null || newConsumptionList.get(i).getConsumedquantity()!=0 ) {
				newConsumptionList.get(i).setConsumptionid(i+1);
			}
	}
		
		//removing list entry with nulls and zeroes	
		List<DummyConsumption> newEditedConsumptionList=new ArrayList<>();
		
	for(int i=0;i<newConsumptionList.size();i++) {

			
			if(newConsumptionList.get(i).getDateofconsumption()==null &&  newConsumptionList.get(i).getProductname()==null && newConsumptionList.get(i).getConsumedquantity()==0 ) {
				
			}else {
				//newPurchaseList.get(index)
				newEditedConsumptionList.add(newConsumptionList.get(i));
			}
		}
	
	
	for(int i=0;i<newEditedConsumptionList.size();i++) {
		
		int index=newEditedConsumptionList.get(i).getConsumptionid()-1;
		
		if(newEditedConsumptionList.get(i).getDateofconsumption()==null) {
			newEditedConsumptionList.get(i).setDateofconsumption(consumptionList.get(index).getDateofconsumption());
		}
		
	
		
		if(newEditedConsumptionList.get(i).getProductname()==null) {
			newEditedConsumptionList.get(i).setProductname(consumptionList.get(index).getProductname());
		}
		

		
		if(newEditedConsumptionList.get(i).getConsumedquantity()==0) {
			newEditedConsumptionList.get(i).setConsumedquantity(consumptionList.get(index).getConsumedquantity());
		}
	
	}
		
	
	//System.out.println("New consumption list");
	for(int i=0;i<newEditedConsumptionList.size();i++) {
		//System.out.println(newEditedConsumptionList.toString());
		db.updateConsumption(newEditedConsumptionList.get(i).getConsumptionid(),  newEditedConsumptionList.get(i).getProductname(),  newEditedConsumptionList.get(i).getDateofconsumption(),  newEditedConsumptionList.get(i).getConsumedquantity());

	}
		
	}
}
