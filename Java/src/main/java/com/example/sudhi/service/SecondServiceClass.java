package com.example.sudhi.service;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import com.example.sudhi.exception.DataNotFoundException;
import com.example.sudhi.model.FinalStock;
import com.example.sudhi.model.LastButOne;
import com.example.sudhi.model.Stock;
import com.example.sudhi.model.Stock1;
import com.example.sudhi.model.Stock2;


@Service
public class SecondServiceClass {


	private static List<FinalStock> finalList1=new ArrayList<FinalStock>();
	
	public List<Stock2> sortListBasedOnDate(List<Stock> stockList) throws ParseException {

		List<Stock1> stockList1=new ArrayList<Stock1>();
		List<Stock2> newStockList=new ArrayList<Stock2>();
		
		for(int i=0;i<stockList.size();i++) {
			Stock1 st1=new Stock1();
			Date date=new SimpleDateFormat("yyyy-MM-dd").parse(stockList.get(i).getDate());
			st1.setDate(date);
			st1.setProductname(stockList.get(i).getProductname());
			st1.setGoodsreceived(stockList.get(i).getGoodsreceived());
			st1.setConsumedquantity(stockList.get(i).getConsumedquantity());			
			stockList1.add(st1);
		}
		
		Collections.sort(stockList1,new DateSorter());
		
		for(int i=0;i<stockList1.size();i++) {
			Stock2 sk=new Stock2();
			DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
			String dateString=df.format(stockList1.get(i).getDate());
			sk.setDate(dateString);
			sk.setProductname(stockList1.get(i).getProductname());
			sk.setGoodsreceived(stockList1.get(i).getGoodsreceived());
			sk.setConsumedquantity(stockList1.get(i).getConsumedquantity());
			
			newStockList.add(sk);
		}
		
//		System.out.println(" Date \t\t product name \t goodsreceived \t  consumedquantity\t");
//		for(Stock2 sk:newStockList) {
//			System.out.println(sk.getDate()+"\t\t"+sk.getProductname()+"\t\t\t"+sk.getGoodsreceived()+"\t\t\t\t"+sk.getConsumedquantity()+"\n");
//		}
		
		return newStockList;
	}
	
	
	
	
	
	
	public List<FinalStock> getRequiredData(List<Stock2> dataList, String fromdate, String todate) throws ParseException, IOException {
		
		//System.out.println("From "+fromdate+" todate "+todate);
//		System.out.println("Data list");
//		for(Stock2 sk:dataList) {
//			System.out.println(sk.toString());
//		}
		
		
		List<String> alldates=new ArrayList<String>();
		
		for(int i=0;i<dataList.size();i++) {
			alldates.add(dataList.get(i).getDate().toString());
		}
		
		
		checkIfFromDateIsLaterThanLastDateOfList(fromdate, alldates.get(alldates.size()-1));
		
		checkIfToDateIsBeforeFirstDateOfList(todate, alldates.get(0));
		
		
		
		if(!  (alldates.contains(fromdate) )){
			//int firstdate=Integer.parseInt(fromdate.substring(0, 2));
			for(int i=0;i<alldates.size();i++) {
				SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
				Date firstDate= sdf.parse(fromdate);
				Date dateFromList=sdf.parse(alldates.get(i));
				
				if(firstDate.before(dateFromList)) {
					fromdate=alldates.get(i);
					break;
				}
				
//				if( firstdate<Integer.parseInt (alldates.get(i).substring(0, 2))) {
//					fromdate=alldates.get(i);
//					break;
//				}
			}
		}
		
		
		
		if( !( alldates.contains(todate) )  ) {
			//int lastdate=Integer.parseInt(todate.substring(0, 2));
			
			for(int i=alldates.size()-1;i>=0;i--) {
				SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
				Date lastDate= sdf.parse(todate);
				Date dateFromList=sdf.parse(alldates.get(i));
				
				if(lastDate.after(dateFromList)) {
					todate=alldates.get(i);
					break;
				}

			}
		}
		

		
		
		
		int first_index=0;
		int last_index=0;
		
		//System.out.println("From date "+fromdate+" to date "+todate);
		
		
		//System.out.println("Getting index");
		for(int i=0;i<dataList.size();i++) {
			if(fromdate.equals(dataList.get(i).getDate())) {
				
				//System.out.println("First Index is "+i);
				first_index=i;
				break;
			}
		}
		
		
		
		for(int i=dataList.size()-1;i>=0;i--) {
			if(todate.equals(dataList.get(i).getDate())) {
				//System.out.println("Last Index is "+i);
				last_index=i;
				break;
			}
		}		
		
		List<Stock2> list_to_search=dataList.subList(0, last_index+1);
//		System.out.println("List to search");
//		System.out.println(" Date \t\t product name \t goodsreceived \t  consumedquantity\t");
//		for(Stock2 sk:list_to_search) {
//			System.out.println(sk.getDate()+"\t\t"+sk.getProductname()+"\t\t\t"+sk.getGoodsreceived()+"\t\t\t\t"+sk.getConsumedquantity()+"\n");
//		}
		
		
		//check this one
		List<Stock2> sub_data_List=dataList.subList(first_index, last_index+1);
		
		
//		System.out.println("Sub list");
//		System.out.println(" Date \t\t product name \t goodsreceived \t  consumedquantity\t");
//		for(Stock2 sk:sub_data_List) {
//			System.out.println(sk.getDate()+"\t\t"+sk.getProductname()+"\t\t\t"+sk.getGoodsreceived()+"\t\t\t\t"+sk.getConsumedquantity()+"\n");
//		}
		
		
		
		
		List<LastButOne> lboList=new ArrayList<LastButOne>();
		
		for(int i=0;i<sub_data_List.size();i++) {
			LastButOne lbo=new LastButOne();
			for(int j=0;j<list_to_search.size();j++) {
				float goods_r=0f;
				float consumed=0f;
				float opening_stock=0f;
				if( (sub_data_List.get(i).getDate()).equals( list_to_search.get(j).getDate() )    &&( sub_data_List.get(i).getProductname()).equalsIgnoreCase(list_to_search.get(j).getProductname()) ) {
					for(int k=0;k<j;k++) {
						
						if(( sub_data_List.get(i).getProductname()).equalsIgnoreCase(list_to_search.get(k).getProductname())) {
							goods_r+=list_to_search.get(k).getGoodsreceived();
							consumed+=list_to_search.get(k).getConsumedquantity();
							
						}
						opening_stock=Math.abs(goods_r-consumed);
						
						
					}
					lbo.setOpeningstock(opening_stock);
					lbo.setDate(sub_data_List.get(i).getDate());
					lbo.setGoodsreceived(sub_data_List.get(i).getGoodsreceived());
					lbo.setProductname(sub_data_List.get(i).getProductname());
					lbo.setConsumedquantity(sub_data_List.get(i).getConsumedquantity());
					
					lboList.add(lbo);
					
				}
			}
		}
		
		
		
		
		
		return setFinalList(lboList);
	}
	
	
	public List<FinalStock> setFinalList(List<LastButOne> lboList) throws IOException {
		
		List<FinalStock> finalList=new ArrayList<FinalStock>();
		
		
		for(int i=0;i<lboList.size();i++) {
			FinalStock fStock=new FinalStock();
			
			fStock.setDate(lboList.get(i).getDate());
			
			float opStock=round(lboList.get(i).getOpeningstock());
			
			//fStock.setOpeningstock(lboList.get(i).getOpeningstock());

			fStock.setOpeningstock(opStock);
			
			fStock.setProductname(lboList.get(i).getProductname());
			
			float goodsReceived=round(lboList.get(i).getGoodsreceived());
			fStock.setGoodsreceived(goodsReceived);
			//fStock.setGoodsreceived(lboList.get(i).getGoodsreceived());

			
			float conQuantity=round(lboList.get(i).getConsumedquantity());
			fStock.setConsumedquantity(conQuantity);
			//fStock.setConsumedquantity(lboList.get(i).getConsumedquantity());

			
			
			float closingquantity=round( Math.abs(   lboList.get(i).getOpeningstock()+ lboList.get(i).getGoodsreceived() - lboList.get(i).getConsumedquantity()  ) );
			//float closingquantity=Math.abs(   lboList.get(i).getOpeningstock()+ lboList.get(i).getGoodsreceived() - lboList.get(i).getConsumedquantity()  );

			fStock.setClosingstock(closingquantity);
			
			finalList.add(fStock);
		}
		
		
		
//		System.out.println("\n Final list");
//		
//		System.out.println(" Date \t\t opening stock \t\t product name \t goodsreceived \t  consumedquantity\t\t\t closing stock");
//
//		for(FinalStock sk2:finalList) {
//			System.out.println(sk2.getDate()+"\t\t"+sk2.getOpeningstock()+"\t\t\t\t"+  sk2.getProductname()+"\t\t\t\t\t"+sk2.getGoodsreceived()+"\t\t\t\t\t"+sk2.getConsumedquantity()+"\t\t\t\t\t\t"+sk2.getClosingstock()+"\n");
//		}
		
		//ec.writeExcel(finalList);
		SecondServiceClass.finalList1=finalList;
		return finalList;
	}
	
	
	
	private void checkIfFromDateIsLaterThanLastDateOfList(String startDate, String endDate) throws ParseException {

		SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
		Date fromDate= sdf.parse(startDate);
        Date lastDate = sdf.parse(endDate);
        
		//System.out.println("SD is "+fromDate+" and "+lastDate+"   ED from checkIfFromDateIsLaterThanLastDateOfList ");

        if (fromDate.after(lastDate) ) {
    		throw new DataNotFoundException("No record found"); 
        }
        
	}
	
	
	private void checkIfToDateIsBeforeFirstDateOfList(String startDate, String endDate) throws ParseException {
		
		SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
		Date toDate= sdf.parse(startDate);
        Date firstDate = sdf.parse(endDate);
        
		//System.out.println("SD is "+toDate+" and "+firstDate+"  ED from checkIfToDateIsBeforeFirstDateOfList ");

        if (toDate.before(firstDate) ) {
    		throw new DataNotFoundException("No record found"); 
        }
	}
	
	
	private static float round(float number) {
		int decimalPlace=3;
		BigDecimal bd = new BigDecimal(number);
		bd = bd.setScale(decimalPlace, BigDecimal.ROUND_HALF_EVEN);
		return bd.floatValue();
	}
	
	
	
	
	public  List<FinalStock> getFinalList()
	{
		return finalList1;
	}
}
