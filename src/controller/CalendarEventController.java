package controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.richfaces.json.JSONArray;
import org.richfaces.json.JSONException;
import org.richfaces.json.JSONObject;

import dao.CalendarEventDao;

import entity.CalendarEvent;

public class CalendarEventController extends HttpServlet{
	 /* 
	 */
	private static final long serialVersionUID = 1L;
	private String line;
	
	CalendarEventDao calEventDao;
	
	public CalendarEventController() {
		
		calEventDao = util.SpringFactory.getCalendarEventDao();
	}
	
	
	//list calendar events in front end
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		List<CalendarEvent> theList = new ArrayList();
		
		theList = calEventDao.getCalendarEvents();
		
		JSONArray ja = new JSONArray(); 
		
		for(CalendarEvent ce : theList) {
			//System.out.println("ce::" + ce.toString());
			  JSONObject bklistObj =new JSONObject();
		        try {
		        	bklistObj.put("id", ce.getCalEventId());
		        	bklistObj.put("title",ce.getCalEventTitle());
		        	bklistObj.put("backgroundColor", ce.getBgColor());
		        	
		        	
		        	//TODO: transcribe the time parts back onto the date to populate the calendar 
		        	//until the date add bug is fixed.
		        	//calendar day
		        	
		        	String startDay = ce.getStartDate().toString();
		        	String endDay = ce.getEndDate().toString();
		        	//System.out.println(startDay);
		        	
		        	
		        	//hours booked 24hr clock append to string so can add to calendar. 
		        	//issue saving hour blocks in timestamp
		        	String sHour = ce.getHourStart();
		        	String eHour = ce.getHourEnd();
		        	
		        	String startDate = startDay + " "+ sHour;
		        	String endDate = endDay + " "+ eHour;
		        	
		        	bklistObj.put("start",startDate);
		        	bklistObj.put("end",endDate);
		        	
		        	bklistObj.put("starthour",ce.getHourStart());
		        	bklistObj.put("endhour",ce.getHourEnd());		
		        	bklistObj.put("allDay",ce.isAllDay());
		        	bklistObj.put("status", false);

		        	bklistObj.put("attendance",2);

		            ja.put(ce.getCalEventId(),bklistObj);

		        } catch (JSONException e) {
		            e.printStackTrace();
		        }
		}
		
		
		System.out.println(ja);

		PrintWriter writer = response.getWriter();
	      
	        writer.println(ja);
	        writer.flush();
		
		
		
		
		
		
	}
	//add a calendar event or list of events requests
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		StringBuilder sb = new StringBuilder();
		//make User user = new User();
	    
	    BufferedReader br = new BufferedReader(request.getReader());
	    	while((line = br.readLine()) != null) {
	    		sb.append(line);
	    		
	    	}
	    if(sb.toString().trim() != "null") {
	    	//looping through element items
	    	JSONObject json;
    		JSONArray jsnA;
    		String fulldate = "";
    		String bgColor= "";
    		String start= "";
    		String end = "";
    		String hourStart="";
    		String hourEnd="";
    		String avail="";
    		String price = "";
    		String calEventTitle = "";
    		String selected = "";
    		Boolean allday=false;
    		List<CalendarEvent> theEvents = new ArrayList();
    		try {
				json = new JSONObject(sb.toString());
				jsnA= new JSONArray(json.getString("studios"));
				
				for(int i=0; i< jsnA.length();i++) {
					JSONObject studio = jsnA.getJSONObject(i);
					CalendarEvent calEve = new CalendarEvent();
					Iterator keys =studio.keys(); //2 studio objects
					
					while(keys.hasNext()) {
						Object innerKey = keys.next(); //get keys in those objects
						//studios  objects keys
						JSONObject studioValues = (JSONObject) studio.get(innerKey.toString());
						System.out.println("Values:: "+studioValues.get("studioName").toString());
						
						
						allday = studioValues.getBoolean("allDay");
						avail=studioValues.getString("avail");
						bgColor=studioValues.getString("bgColor");
						
						calEventTitle=studioValues.getString("studioName");
						
						fulldate=studioValues.getString("fulldate");
						
						price=studioValues.getString("price"); // total per 2 hr slot
						selected=studioValues.getString("selected");
						
						start=studioValues.getString("start");
						end=studioValues.getString("end");
						
						String tempStart = start.substring((start.indexOf(" ")+1),start.length());
						String tempEnd = end.substring((end.indexOf(" ")+1),end.length());
						System.out.println(" start entity "+tempStart+" end entity"+tempEnd);
						
						calEve.setCalEventTitle(calEventTitle);
						calEve.setBgColor(bgColor);
						calEve.setPrice(price);
						calEve.setAllDay(allday);
						calEve.setAvail(avail);
						calEve.setSelected(selected);
						calEve.setHourStart(tempStart);
						calEve.setHourEnd(tempEnd);
						
						
						SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
						Date stime = null;
						Date etime = null;
						try {
							 stime = new Timestamp((sdf.parse(start)).getTime());
							 etime = new Timestamp((sdf.parse(end)).getTime());
							//System.out.println(stime);
						} catch (ParseException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						
						
						calEve.setFulldate(stime);
						calEve.setStartDate(stime);
						calEve.setEndDate(etime);
						
						theEvents.add(calEve);
					
					}
					
					
				
				}
    		
    		
    		} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			
    	
			}
			
    		for(CalendarEvent eve: theEvents) {
    			calEventDao.addCalendarEvent(eve);
    		}
    		
//			calEventDao.addCalendarEvent(calEve);

    		
	    }
	
	}
	
}
