package com.example.sudhi.model;

import java.util.Date;

public class Stock1 {

	private Date date;

	private String productname;

	// private int openingstock;

	private float goodsreceived;

	private float consumedquantity;

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
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

	public void setConsumedquantity(float f) {
		this.consumedquantity = f;
	}
	
	

}
