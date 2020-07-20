package com.example.sudhi.repository;


import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import com.example.sudhi.model.Purchase;


public interface PurchaseRepository extends CrudRepository<Purchase, Long>{

	@Query(value="select * from purchase where \"vendorname\" = :vendorname AND date BETWEEN to_date(:fdate, 'DD/MM/YYYY') AND to_date(:tdate, 'DD/MM/YYYY')  order by date",nativeQuery=true)
	 List<Purchase> findByVendorname(@Param("vendorname") String vendorname,@Param("fdate") String fromDate,@Param("tdate")  String toDate);

	
	@Query(value="select vendorname from purchase where UPPER(\"vendorname\")  LIKE UPPER(CONCAT('%',:vname,'%')) LIMIT 5",nativeQuery=true)
	public List<String> findVendors(@Param("vname") String vname);
	
	@Query(value="select productname from purchase where UPPER(\"productname\") LIKE  UPPER(CONCAT('%',:pname,'%')) LIMIT 5",nativeQuery=true)
	public List<String> findProducts(@Param("pname")String productname);
	
	
	@Query(value="update purchase set billnumber=:bno,productname=:pname,vendorname=:vname,date=:date,price=:price,quantity=:quantity,amount=:amount where purchaseid=:pid",nativeQuery = true)
	public void updatePurchase(@Param("pid")int purchaseid, @Param("bno")int billnumber,@Param("pname")String productname,@Param("vname") String vname,@Param("date")Date date,@Param("price")float price,@Param("quantity")float quantity,@Param("amount")float amount);
	
	@Query(value="select * from purchase order by date",nativeQuery=true)
	public List<Purchase> findAllPurchases();
	
	@Query(value="select * from purchase",nativeQuery=true)
	public List<Purchase> getAllPurchases();
	
	
	
}