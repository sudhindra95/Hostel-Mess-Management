package com.example.sudhi.model;

import java.sql.Date;


public class DummyPurchase {

	private int purchaseid;
		
	private int billnumber;
	
	private String productname;
	
	private String vendorname;
	
	private Date date;
	
	private float price;
	
	private float quantity;
	
	private float amount;

	public int getPurchaseid() {
		return purchaseid;
	}

	public void setPurchaseid(int purchaseid) {
		this.purchaseid = purchaseid;
	}

	public int getBillnumber() {
		return billnumber;
	}

	public void setBillnumber(int billnumber) {
		this.billnumber = billnumber;
	}

	public String getProductname() {
		return productname;
	}

	public void setProductname(String productname) {
		this.productname = productname;
	}

	public String getVendorname() {
		return vendorname;
	}

	public void setVendorname(String vendorname) {
		this.vendorname = vendorname;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public float getQuantity() {
		return quantity;
	}

	public void setQuantity(float quantity) {
		this.quantity = quantity;
	}

	public float getAmount() {
		return amount;
	}

	public void setAmount(float amount) {
		this.amount = amount;
	}

	@Override
	public String toString() {
		return "DummyPurchase [purchaseid=" + purchaseid + ", billnumber=" + billnumber + ", productname=" + productname
				+ ", vendorname=" + vendorname + ", date=" + date + ", price=" + price + ", quantity=" + quantity
				+ ", amount=" + amount + "]";
	}
	
	
	
}
