package com.example.sudhi.model;

public class Stock {

	private String date;

	private String productname;

	// private int openingstock;

	private float goodsreceived;

	private float consumedquantity;

	// private int closingstock;

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getProductname() {
		return productname;
	}

	public void setProductname(String productname) {
		this.productname = productname;
	}

	/*
	 * public int getOpeningstock() { return openingstock; }
	 * 
	 * public void setOpeningstock(int openingstock) { this.openingstock =
	 * openingstock; }
	 */

	public float getGoodsreceived() {
		return goodsreceived;
	}

	public void setGoodsreceived(float goodsreceived) {
		this.goodsreceived = goodsreceived;
	}

	public float getConsumedquantity() {
		return consumedquantity;
	}

	public void setConsumedquantity(float consumedquantity) {
		this.consumedquantity = consumedquantity;
	}

	@Override
	public String toString() {
		return "Stock [date=" + date + ", productname=" + productname + ", goodsreceived=" + goodsreceived
				+ ", consumedquantity=" + consumedquantity + "]";
	}

	/*
	 * public int getClosingstock() { return closingstock; }
	 * 
	 * public void setClosingstock(int closingstock) { this.closingstock =
	 * closingstock; }
	 */
	
	
}
