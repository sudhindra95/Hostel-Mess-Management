package com.example.sudhi.dbconn;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.sudhi.model.NewConsumption;
import com.example.sudhi.model.NewPurchase;

public class DbConnection {

	public List<NewConsumption> connectToNewConsumption(){
		
		List<NewConsumption> ncResult=new  ArrayList<>();
		
		String query="SELECT sum(consumedquantity) as consumedquantity,productname,dateofconsumption from consumption group by productname,dateofconsumption order by dateofconsumption";
		
		try (Connection conn = DriverManager.getConnection(
                "jdbc:postgresql://127.0.0.1:5432/srs_madhav", "postgres", "postgres");
             PreparedStatement preparedStatement = conn.prepareStatement(query)) {

            ResultSet resultSet = preparedStatement.executeQuery();
	
            while (resultSet.next()) {
            	
            	float quantity=resultSet.getFloat("consumedquantity");
            	
            	String pname=resultSet.getString("productname");
            	
            	Date consumedate=resultSet.getDate("dateofconsumption");

                

                NewConsumption nc = new NewConsumption();
                nc.setConsumedquantity(quantity);
                nc.setProductname(pname);
                nc.setDateofconsumption(consumedate);
                
                ncResult.add(nc);

            }
            
//            System.out.println("Consumed quantity \t\t Productname \t\t Date of Consumption");
//            for(NewConsumption nc:ncResult) {
//            	System.out.println(nc.getConsumedquantity()+"\t\t"+nc.getProductname()+"\t\t"+nc.getDateofconsumption());
//            }
            

        } catch (SQLException e) {
            System.err.format("SQL State: %s\n%s", e.getSQLState(), e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
		return ncResult;
	}
	
	
	
	public List<NewPurchase> connectToNewPurchase(){
		
		List<NewPurchase> npResult=new  ArrayList<>();
		
		String query="select sum(quantity) as quantity,date,productname from purchase group by productname,date order by date";
		
		try (Connection conn = DriverManager.getConnection(
                "jdbc:postgresql://127.0.0.1:5432/srs_madhav", "postgres", "postgres");
             PreparedStatement preparedStatement = conn.prepareStatement(query)) {

            ResultSet resultSet = preparedStatement.executeQuery();
	
            while (resultSet.next()) {
            	
            	float quantity=resultSet.getFloat("quantity");
            	
            	String pname=resultSet.getString("productname");
            	
            	Date purchasedate=resultSet.getDate("date");

                

               NewPurchase np=new NewPurchase();
               
               np.setQuantity(quantity);
               np.setProductname(pname);
               np.setDate(purchasedate);
                
                npResult.add(np);

            }
            
//            System.out.println("Purchase quantity \t\t Productname \t\t Date of Consumption");
//            for(NewPurchase np:npResult) {
//            	System.out.println(np.getQuantity()+"\t\t"+np.getProductname()+"\t\t"+np.getDate());
//            }
            

        } catch (SQLException e) {
            System.err.format("SQL State: %s\n%s", e.getSQLState(), e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
		return npResult;
	}
	
	
	public List<NewConsumption> getConsumptionDataByDate(String fromdate,String todate){
		
		List<NewConsumption> ncDateResult=new  ArrayList<>();

		String query="SELECT sum(consumedquantity) as consumedquantity,productname,dateofconsumption from consumption where  dateofconsumption  BETWEEN to_date('"+fromdate+"', 'DD/MM/YYYY') AND to_date('"+todate+"', 'DD/MM/YYYY') group by productname,dateofconsumption order by dateofconsumption";
		
		try (Connection conn = DriverManager.getConnection(
                "jdbc:postgresql://127.0.0.1:5432/srs_madhav", "postgres", "postgres");
             PreparedStatement preparedStatement = conn.prepareStatement(query)) {

            ResultSet resultSet = preparedStatement.executeQuery();
	
            while (resultSet.next()) {
            	
            	float quantity=resultSet.getFloat("consumedquantity");
            	
            	String pro_name=resultSet.getString("productname");
            	
            	Date consumedate=resultSet.getDate("dateofconsumption");

                

                NewConsumption nc = new NewConsumption();
                nc.setConsumedquantity(quantity);
                nc.setProductname(pro_name);
                nc.setDateofconsumption(consumedate);
                
                ncDateResult.add(nc);

            }
            
//            System.out.println("Consumed quantity \t\t Date of Consumption");
//            for(NewConsumption nc:ncDateResult) {
//            	System.out.println(nc.getConsumedquantity()+"\t\t"+nc.getDateofconsumption());
//            }
            

        } catch (SQLException e) {
            System.err.format("SQL State: %s\n%s", e.getSQLState(), e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
		return ncDateResult;
	}
	
	
	
public List<NewConsumption> getConsumptionDataByDateAndName(String productname,String fromdate,String todate){
		
		List<NewConsumption> ncDateResult=new  ArrayList<>();

		String query="SELECT sum(consumedquantity) as consumedquantity,dateofconsumption from consumption where productname='"+productname+"'  AND dateofconsumption  BETWEEN to_date('"+fromdate+"', 'DD/MM/YYYY') AND to_date('"+todate+"', 'DD/MM/YYYY')  group by productname,dateofconsumption order by dateofconsumption";
		
		try (Connection conn = DriverManager.getConnection(
                "jdbc:postgresql://127.0.0.1:5432/srs_madhav", "postgres", "postgres");
             PreparedStatement preparedStatement = conn.prepareStatement(query)) {

            ResultSet resultSet = preparedStatement.executeQuery();
	
            while (resultSet.next()) {
            	
            	float quantity=resultSet.getFloat("consumedquantity");
            	
            	
            	Date consumedate=resultSet.getDate("dateofconsumption");

                

                NewConsumption nc = new NewConsumption();
                nc.setConsumedquantity(quantity);
                nc.setDateofconsumption(consumedate);
                
                ncDateResult.add(nc);

            }
            

            

        } catch (SQLException e) {
            System.err.format("SQL State: %s\n%s", e.getSQLState(), e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
		return ncDateResult;
	}


	public void updatePurchase(int pid,int bno,String pname,String vname,Date pdate,float price,float quant,float amt) {
		
		//System.out.println(pid+" "+pname+" "+vname+" "+pdate+" "+price+" "+quant+" "+amt);
		
		String updateQuery="update purchase set billnumber="+bno+",productname='"+pname+"',vendorname='"+vname+"',date='"+pdate+"',price="+price+",quantity="+quant+",amount="+amt+" where purchaseid="+pid;
		
		try (Connection conn = DriverManager.getConnection(
                "jdbc:postgresql://127.0.0.1:5432/srs_madhav", "postgres", "postgres");
             PreparedStatement preparedStatement = conn.prepareStatement(updateQuery)) {
			int resultSet = preparedStatement.executeUpdate();
			
			//System.out.println(resultSet+" record updated");
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}



	public void updateConsumption(int consumptionid, String productname, Date dateofconsumption,float consumedquantity) {
		
		String updateQuery="update consumption set productname='"+productname+"',dateofconsumption='"+dateofconsumption+"',consumedquantity="+consumedquantity+" where consumptionid="+consumptionid;
		
		try (Connection conn = DriverManager.getConnection(
                "jdbc:postgresql://127.0.0.1:5432/srs_madhav", "postgres", "postgres");
             PreparedStatement preparedStatement = conn.prepareStatement(updateQuery)) {
			int resultSet = preparedStatement.executeUpdate();
			
			//System.out.println(resultSet+" record updated");
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
}
