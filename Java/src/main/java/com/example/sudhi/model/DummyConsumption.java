package com.example.sudhi.model;

import java.sql.Date;


public class DummyConsumption {

	private int consumptionid;
	
	private Date dateofconsumption;
	
	private String productname;
	
	private float consumedquantity;

	public int getConsumptionid() {
		return consumptionid;
	}

	public void setConsumptionid(int consumptionid) {
		this.consumptionid = consumptionid;
	}

	public Date getDateofconsumption() {
		return dateofconsumption;
	}

	public void setDateofconsumption(Date dateofconsumption) {
		this.dateofconsumption = dateofconsumption;
	}

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

	@Override
	public String toString() {
		return "DummyConsumption [consumptionid=" + consumptionid + ", dateofconsumption=" + dateofconsumption
				+ ", productname=" + productname + ", consumedquantity=" + consumedquantity + "]";
	}
	
	
	
}
