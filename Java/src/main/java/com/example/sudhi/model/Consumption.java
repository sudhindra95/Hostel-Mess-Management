package com.example.sudhi.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;


@JsonInclude(Include.NON_NULL)
@Entity
@Table(name = "consumption")
public class Consumption {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonIgnore
	@Column
	private int consumptionid;
	
	@Column
	private Date dateofconsumption;
	
	@Column
	private String productname;
	
	@Column
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
		return "Consumption [consumptionid=" + consumptionid + ", productname=" + productname + ", consumedquantity="
				+ consumedquantity + ", dateofconsumption=" + dateofconsumption + "]";
	}
	
	
}
