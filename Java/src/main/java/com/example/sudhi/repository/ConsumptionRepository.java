package com.example.sudhi.repository;


import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.sudhi.model.Consumption;
import com.example.sudhi.model.Purchase;



@Repository
public interface ConsumptionRepository extends CrudRepository<Consumption,String>{

//	@Query(value="select * from consumption where productname= '?1'  AND  dateofconsumption between '?2' AND '?3' ",nativeQuery=true)
//	public List<Consumption> findConsumption(String prodname, String fromDate,  String toDate);
	
	@Query(value="select * from consumption where productname= :pname  AND dateofconsumption BETWEEN to_date(:fdate, 'DD/MM/YYYY') AND to_date(:tdate, 'DD/MM/YYYY')  ",nativeQuery=true)
	public List<Consumption> findConsumption(@Param("pname")String prodname,@Param("fdate") String fromDate,@Param("tdate")  String toDate);
	
	
	@Query(value="select * from consumption where dateofconsumption BETWEEN to_date(:fdate, 'DD/MM/YYYY') AND to_date(:tdate, 'DD/MM/YYYY')  order by dateofconsumption",nativeQuery=true)
	public List<Consumption> findConsumptionByDate(@Param("fdate") String fromDate,@Param("tdate")  String toDate);
	
	//public List<Consumption> findByProductNameFromDateToDate(String prodname, String fromDate,  String toDate);
	
	@Query(value="select productname from consumption where UPPER(\"productname\") LIKE  UPPER(CONCAT('%',:pname,'%'))",nativeQuery=true)
	public List<String> findProducts(@Param("pname")String productname);
	
	@Query(value="select * from consumption order by dateofconsumption",nativeQuery=true)
	public List<Consumption> findAllConsumption();
	
	@Query(value="select * from consumption",nativeQuery=true)
	public List<Consumption> getAllConsumptions();
	


}