package com.example.sudhi.model;

public class Stock2 {

	
	private String date;

	private String productname;

	private float goodsreceived;

	private float consumedquantity;

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
		return "Stock2 [date=" + date + ", productname=" + productname + ", goodsreceived=" + goodsreceived
				+ ", consumedquantity=" + consumedquantity + "]";
	}

	
}
