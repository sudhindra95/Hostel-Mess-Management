package com.example.sudhi.model;

import java.sql.Date;


public class NewConsumption {

	private String productname;
	
	private float consumedquantity;
	
	private Date dateofconsumption;

	public String getProductname() {
		return productname;
	}

	public void setProductname(String productname) {
		this.productname = productname;
	}

	public float getConsumedquantity() {
		return consumedquantity;
	}

	public void setConsumedquantity(float consumedquantity) {
		this.consumedquantity = consumedquantity;
	}

	public Date getDateofconsumption() {
		return dateofconsumption;
	}

	public void setDateofconsumption(Date dateofconsumption) {
		this.dateofconsumption = dateofconsumption;
	}

	@Override
	public String toString() {
		return "NewConsumption [productname=" + productname + ", consumedquantity=" + consumedquantity
				+ ", dateofconsumption=" + dateofconsumption + "]";
	}
	
	
}
