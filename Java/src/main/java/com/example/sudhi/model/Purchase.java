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
@Table(name = "purchase")
public class Purchase {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonIgnore
	@Column
	private int purchaseid;
	
	@Column
	private int billnumber;
	

	@Column
	private String productname;
	
	@Column
	private String vendorname;
	

	@Column
	private Date date;
	
	@Column
	private float price;
	
	@Column
	private float quantity;
	
	@Column
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
		return "Purchase [purchaseid=" + purchaseid + ", billnumber=" + billnumber + ", productname=" + productname
				+ ", vendorname=" + vendorname + ", date=" + date + ", price=" + price + ", quantity=" + quantity
				+ ", amount=" + amount + "]";
	}


}
