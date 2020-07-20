package com.example.sudhi.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.RoundingMode;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFRichTextString;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import com.example.sudhi.model.FinalStock;
import com.example.sudhi.model.NewConsumption;
import com.example.sudhi.model.Purchase;


public class ExcelCreation {

	 String cellValue;
	 private static String stockfilename;
	 private static String purchasefilename;
	 private static String consumptionfilenamebydate;
	 
	 private static String consumptionfilenamebydateandname;

	 
	 public void writeStockExcel(List<FinalStock> finalList) throws IOException {
		 
		 
		 	String timeStamp = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date());
			File file=new File("Stock Register excel " + timeStamp + ".xlsx");
			stockfilename = file.toString();

			FileOutputStream fos = new FileOutputStream( file);

			XSSFWorkbook workbook = new XSSFWorkbook();
			XSSFSheet sheet = workbook.createSheet("Stock Data");

			CellStyle stylerowHeading = workbook.createCellStyle();
			Font font = workbook.createFont();
			font.setBold(true);
			font.setFontName(HSSFFont.FONT_ARIAL);
			font.setFontHeightInPoints((short) 12);
			stylerowHeading.setFont(font);
			stylerowHeading.setAlignment(HorizontalAlignment.CENTER);
			stylerowHeading.setVerticalAlignment(VerticalAlignment.CENTER);

			Row rowHeading = sheet.createRow(0);
			
			rowHeading.createCell(0).setCellValue("Date");
			rowHeading.createCell(1).setCellValue("Product Name");
			rowHeading.createCell(2).setCellValue("Opening Stock");
			rowHeading.createCell(3).setCellValue("Goods Received");
			rowHeading.createCell(4).setCellValue("Consumed Quantity");
			rowHeading.createCell(5).setCellValue("Closing Stock");
			
			sheet.addMergedRegion(new CellRangeAddress(0,0,7,9));
			rowHeading.createCell(7).setCellValue("Madhava Nilaya Campus");
			
			for (int i = 0; i < 6; i++) {

				rowHeading.getCell(i).setCellStyle(stylerowHeading);

			}

			rowHeading.getCell(7).setCellStyle(stylerowHeading);
			int rowCount = 0;
			CellStyle stylerowHeading1 = workbook.createCellStyle();
			stylerowHeading1.setAlignment(HorizontalAlignment.CENTER);
			stylerowHeading1.setVerticalAlignment(VerticalAlignment.CENTER);

			for (FinalStock fstock : finalList) {
				Row row = sheet.createRow(++rowCount);
				writeFile(fstock, row,sheet,stylerowHeading1);
				//sheet.createRow(++rowCount);
			}

			workbook.write(fos);

			

			workbook.close();
			fos.close();
	 }
	 
	 private void writeFile(FinalStock fstock, Row row, XSSFSheet sheet, CellStyle stylerowHeading1) {
			
		 	DecimalFormat df = new DecimalFormat("#.###");
			df.setRoundingMode(RoundingMode.CEILING);
		 
		 
			Cell cell = row.createCell(0);	
			cell.setCellValue(fstock.getDate());
			sheet.autoSizeColumn(0);
			cell.setCellStyle(stylerowHeading1);

			cell = row.createCell(1);
			cell.setCellValue(fstock.getProductname());
			sheet.autoSizeColumn(1);
			cell.setCellStyle(stylerowHeading1);
			
			cell=row.createCell(2);			
			cell.setCellValue(df.format(fstock.getOpeningstock()));
			sheet.autoSizeColumn(2);
			cell.setCellStyle(stylerowHeading1);
			
			cell = row.createCell(3);	
			cell.setCellValue(df.format(fstock.getGoodsreceived()));
			sheet.autoSizeColumn(3);
			cell.setCellStyle(stylerowHeading1);

			cell = row.createCell(4);
			cell.setCellValue(df.format(fstock.getConsumedquantity()));
			sheet.autoSizeColumn(4);
			cell.setCellStyle(stylerowHeading1);
			
			cell=row.createCell(5);		
			cell.setCellValue(df.format(fstock.getClosingstock()));
			sheet.autoSizeColumn(5);
			cell.setCellStyle(stylerowHeading1);
		
					
		}
		
		public  String getStockFileName()
		{
			return stockfilename;
		}

		
		
		
		public void writePurchaseExcel(List<Purchase> pList) throws IOException {
			 
			 
			 String timeStamp = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date());
				File file=new File(pList.get(0).getVendorname()+" purchase register excel " + timeStamp + ".xlsx");
				purchasefilename = file.toString();

				FileOutputStream fos = new FileOutputStream( file);

				XSSFWorkbook workbook = new XSSFWorkbook();
				XSSFSheet sheet = workbook.createSheet(pList.get(0).getVendorname());
				
				CellStyle stylerowHeading = workbook.createCellStyle();
				Font font = workbook.createFont();
				font.setBold(true);
				font.setFontName(HSSFFont.FONT_ARIAL);
				font.setFontHeightInPoints((short) 16);
				stylerowHeading.setFont(font);
				stylerowHeading.setAlignment(HorizontalAlignment.CENTER);
				stylerowHeading.setVerticalAlignment(VerticalAlignment.CENTER);

				Row row1 = sheet.createRow(0);
				Cell cell=row1.createCell((short) 0);
				String cellvalue=pList.get(0).getVendorname();
		        cell.setCellValue(new XSSFRichTextString(cellvalue));

	            sheet.addMergedRegion(new CellRangeAddress(0,0,0,5));  
	            
	        	
	        	

					row1.getCell(0).setCellStyle(stylerowHeading);
					
					sheet.addMergedRegion(new CellRangeAddress(0,0,7,11));
					Cell cell1=row1.createCell((short)7);
					cell1.setCellValue("Madhava Nilaya Campus");

					row1.getCell(7).setCellStyle(stylerowHeading);
				


				CellStyle stylerowHeading1 = workbook.createCellStyle();
				Font cellfont = workbook.createFont();
				cellfont.setBold(true);
				cellfont.setFontName(HSSFFont.FONT_ARIAL);
				cellfont.setFontHeightInPoints((short) 12);
				stylerowHeading1.setFont(cellfont);
				stylerowHeading1.setAlignment(HorizontalAlignment.CENTER);
				stylerowHeading1.setVerticalAlignment(VerticalAlignment.CENTER);

				Row rowHeading1 = sheet.createRow(2);
				
				rowHeading1.createCell(0).setCellValue("Date");
				rowHeading1.createCell(1).setCellValue("Bill Number");
				rowHeading1.createCell(2).setCellValue("Product Name");
				rowHeading1.createCell(3).setCellValue("Price");
				rowHeading1.createCell(4).setCellValue("Quantity");
				rowHeading1.createCell(5).setCellValue("Amount");
				
			
				
				for (int i = 0; i < 6; i++) {

					rowHeading1.getCell(i).setCellStyle(stylerowHeading1);

				}

				
				int rowCount = 3;
				CellStyle stylerowHeading2 = workbook.createCellStyle();
				stylerowHeading2.setAlignment(HorizontalAlignment.CENTER);
				stylerowHeading2.setVerticalAlignment(VerticalAlignment.CENTER);

				for (Purchase p : pList) {
					Row row = sheet.createRow(++rowCount);
					writePurchaseFile(p, row,sheet,stylerowHeading2);
					//sheet.createRow(++rowCount);
				}

				workbook.write(fos);

				

				workbook.close();
				fos.close();
		 }
		 
		 private void writePurchaseFile(Purchase purchase, Row row, XSSFSheet sheet, CellStyle stylerowHeading2) {
				

				Cell cell = row.createCell(0);
				 DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");  
	             String strDate = dateFormat.format(purchase.getDate());  
				cell.setCellValue(strDate);
				sheet.autoSizeColumn(0);
				cell.setCellStyle(stylerowHeading2);

				cell = row.createCell(1);
				cell.setCellValue(purchase.getBillnumber());
				sheet.autoSizeColumn(1);
				cell.setCellStyle(stylerowHeading2);
				
				cell=row.createCell(2);			
				cell.setCellValue(purchase.getProductname());
				sheet.autoSizeColumn(2);
				cell.setCellStyle(stylerowHeading2);
				
				cell = row.createCell(3);	
				cell.setCellValue(purchase.getPrice());
				sheet.autoSizeColumn(3);
				cell.setCellStyle(stylerowHeading2);

				cell = row.createCell(4);
				cell.setCellValue(purchase.getQuantity());
				sheet.autoSizeColumn(4);
				cell.setCellStyle(stylerowHeading2);
				
				cell=row.createCell(5);			
				cell.setCellValue(purchase.getAmount());
				sheet.autoSizeColumn(5);
				cell.setCellStyle(stylerowHeading2);
			
						
			}
			
			public  String getPurchaseFileName()
			{
				return purchasefilename;
			}
			
			public void writeConsumptionExcelByDate(List<NewConsumption> cListByDate) throws IOException {
				String timeStamp = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date());
				File file=new File("Consumption Register excel " + timeStamp + ".xlsx");
				consumptionfilenamebydate = file.toString();

				FileOutputStream fos = new FileOutputStream( file);

				XSSFWorkbook workbook = new XSSFWorkbook();
				XSSFSheet sheet = workbook.createSheet("Consumption Data");

				CellStyle stylerowHeading = workbook.createCellStyle();
				Font font = workbook.createFont();
				font.setBold(true);
				font.setFontName(HSSFFont.FONT_ARIAL);
				font.setFontHeightInPoints((short) 12);
				stylerowHeading.setFont(font);
				stylerowHeading.setAlignment(HorizontalAlignment.CENTER);
				stylerowHeading.setVerticalAlignment(VerticalAlignment.CENTER);

				Row rowHeading = sheet.createRow(0);
				
				rowHeading.createCell(0).setCellValue("Date of Consumption");
				rowHeading.createCell(1).setCellValue("Product Name");				
				rowHeading.createCell(2).setCellValue("Consumed Quantity");
				
				sheet.addMergedRegion(new CellRangeAddress(0,0,4,6));
				rowHeading.createCell(4).setCellValue("Madhava Nilaya Campus");
				
				for (int i = 0; i < 3; i++) {

					rowHeading.getCell(i).setCellStyle(stylerowHeading);

				}
				
				rowHeading.getCell(4).setCellStyle(stylerowHeading);

				
				int rowCount = 0;
				CellStyle stylerowHeading1 = workbook.createCellStyle();
				stylerowHeading1.setAlignment(HorizontalAlignment.CENTER);
				stylerowHeading1.setVerticalAlignment(VerticalAlignment.CENTER);

				for (NewConsumption nc : cListByDate) {
					Row row = sheet.createRow(++rowCount);
					writeConsumptionFileByDate(nc, row,sheet,stylerowHeading1);
					//sheet.createRow(++rowCount);
				}

				workbook.write(fos);

				

				workbook.close();
				fos.close();
			}
			
			private void writeConsumptionFileByDate(NewConsumption nc, Row row, XSSFSheet sheet, CellStyle stylerowHeading1) {
				
			 	DecimalFormat df = new DecimalFormat("#.###");
				df.setRoundingMode(RoundingMode.CEILING);
			 
			 
				Cell cell = row.createCell(0);
				DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");  
	             String strDate = dateFormat.format(nc.getDateofconsumption());  
				cell.setCellValue(strDate);
				sheet.autoSizeColumn(0);
				cell.setCellStyle(stylerowHeading1);

				cell = row.createCell(1);
				cell.setCellValue(nc.getProductname());
				sheet.autoSizeColumn(1);
				cell.setCellStyle(stylerowHeading1);			

				cell = row.createCell(2);
				cell.setCellValue(df.format(nc.getConsumedquantity()));
				sheet.autoSizeColumn(2);
				cell.setCellStyle(stylerowHeading1);

			
						
			}
			
			public  String getConsumptionFileNameByDate()
			{
				return consumptionfilenamebydate;
			}
			
			
			public void writeConsumptionExcelByDateAndName(List<NewConsumption> cListByDateAndName,String productname) throws IOException{
				String timeStamp = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date());
				File file=new File(productname+" consumption register excel " + timeStamp + ".xlsx");
				consumptionfilenamebydateandname = file.toString();

				FileOutputStream fos = new FileOutputStream( file);

				XSSFWorkbook workbook = new XSSFWorkbook();
				XSSFSheet sheet = workbook.createSheet(productname);
				
				CellStyle stylerowHeading = workbook.createCellStyle();
				Font font = workbook.createFont();
				font.setBold(true);
				font.setFontName(HSSFFont.FONT_ARIAL);
				font.setFontHeightInPoints((short) 16);
				stylerowHeading.setFont(font);
				stylerowHeading.setAlignment(HorizontalAlignment.CENTER);
				stylerowHeading.setVerticalAlignment(VerticalAlignment.CENTER);

				Row row1 = sheet.createRow(0);
				Cell cell=row1.createCell((short) 0);
		        cell.setCellValue(new XSSFRichTextString(productname));

	            sheet.addMergedRegion(new CellRangeAddress(0,0,0,1));  
	            
	            sheet.addMergedRegion(new CellRangeAddress(0,0,3,7));
				Cell cellm=row1.createCell((short)3);
				cellm.setCellValue("Madhava Nilaya Campus");
        	
				row1.getCell(0).setCellStyle(stylerowHeading);
				
				row1.getCell(3).setCellStyle(stylerowHeading);
				

				CellStyle stylerowHeading1 = workbook.createCellStyle();
				Font cellfont = workbook.createFont();
				cellfont.setBold(true);
				cellfont.setFontName(HSSFFont.FONT_ARIAL);
				cellfont.setFontHeightInPoints((short) 12);
				stylerowHeading1.setFont(cellfont);
				stylerowHeading1.setAlignment(HorizontalAlignment.CENTER);
				stylerowHeading1.setVerticalAlignment(VerticalAlignment.CENTER);

				Row rowHeading1 = sheet.createRow(2);
				
				rowHeading1.createCell(0).setCellValue("Date of Consumption");
				rowHeading1.createCell(1).setCellValue("Consumed Quantity");
				
				for (int i = 0; i < 2; i++) {

					rowHeading1.getCell(i).setCellStyle(stylerowHeading1);

				}
				
				float totalconsumption=0;
				
				for(NewConsumption n:cListByDateAndName) {
					totalconsumption+=n.getConsumedquantity();
				}
				
				int rowCount = 3;
				CellStyle stylerowHeading2 = workbook.createCellStyle();
				stylerowHeading2.setAlignment(HorizontalAlignment.CENTER);
				stylerowHeading2.setVerticalAlignment(VerticalAlignment.CENTER);

				for (NewConsumption nc : cListByDateAndName) {
					Row row = sheet.createRow(++rowCount);
					writeConsumptionFileByDateAndName(nc, row,sheet,stylerowHeading2);
					//sheet.createRow(++rowCount);
				}
				
				Row row = sheet.createRow(++rowCount);
				
				Cell cell1 = row.createCell(0);		             
				cell1.setCellValue("Total Consumption");
				sheet.autoSizeColumn(0);
				cell1.setCellStyle(stylerowHeading1);
				
				DecimalFormat df = new DecimalFormat("#.###");
				df.setRoundingMode(RoundingMode.CEILING);
				
				cell1 = row.createCell(1);
				cell1.setCellValue(df.format(totalconsumption));
				sheet.autoSizeColumn(1);
				cell1.setCellStyle(stylerowHeading1);


				workbook.write(fos);

				

				workbook.close();
				fos.close();

			}
			
			private void writeConsumptionFileByDateAndName(NewConsumption nc, Row row, XSSFSheet sheet, CellStyle stylerowHeading1) {
				
			 	DecimalFormat df = new DecimalFormat("#.###");
				df.setRoundingMode(RoundingMode.CEILING);
			 
			 
				Cell cell = row.createCell(0);	
				DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");  
	             String strDate = dateFormat.format(nc.getDateofconsumption());  
				cell.setCellValue(strDate);
				sheet.autoSizeColumn(0);
				cell.setCellStyle(stylerowHeading1);

				
				cell = row.createCell(1);
				cell.setCellValue(df.format(nc.getConsumedquantity()));
				sheet.autoSizeColumn(1);
				cell.setCellStyle(stylerowHeading1);

			
						
			}
			
			public  String getConsumptionFileNameByDateAndName()
			{
				return consumptionfilenamebydateandname;
			}
}
