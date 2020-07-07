package entity;
/*
* * This is the persistence POJO (Plain Ordinary Java Object) mapping to the database table "calendar bookingEvent table"
* using Hibernate 3 Annotations.
* 
* Studio Object Entity
* @author Crystal Hansen
*  June 23 2020
* *
* */

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.AccessType;

@Entity						// This is a persistent class
@Table(name="CalendarEvent")	// This class maps to the table named "employees".
@AccessType("field")		// This class uses field-based annotations.

public class CalendarEvent implements java.io.Serializable {
	@Transient 
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue( strategy = GenerationType.AUTO )
	private int calEventId; 
	@Column(length=50)
	private String calEventTitle;
	@Column(length=10)
	private String bgColor;
	
	@Column(length=10)
	private String price;
	
	@Temporal(TemporalType.DATE)
	private Date fulldate;
	
	private String selected;
	
	private boolean allDay;
	
	private String avail;
	
	private String hourStart;
	private String hourEnd;
	
	@Temporal(TemporalType.DATE)
	private Date startDate;
	
	@Temporal(TemporalType.DATE)
	private Date endDate;
	
	
	
	public int getCalEventId() {
		return calEventId;
	}
	public void setCalEventId(int calEventId) {
		this.calEventId = calEventId;
	}
	public String getCalEventTitle() {
		return calEventTitle;
	}
	public void setCalEventTitle(String calEventTitle) {
		this.calEventTitle = calEventTitle;
	}
	public String getBgColor() {
		return bgColor;
	}
	public void setBgColor(String bgColor) {
		this.bgColor = bgColor;
	}
	
	
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public Date getFulldate() {
		return fulldate;
	}
	public void setFulldate(Date fulldate) {
		this.fulldate = fulldate;
	}
	
	
	public String getSelected() {
		return selected;
	}
	public void setSelected(String selected) {
		this.selected = selected;
	}
	public boolean isAllDay() {
		return allDay;
	}
	public void setAllDay(boolean allDay) {
		this.allDay = allDay;
	}
	public String getAvail() {
		return avail;
	}
	public void setAvail(String avail) {
		this.avail = avail;
	}
	
	
	public String getHourStart() {
		return hourStart;
	}
	public void setHourStart(String hourStart) {
		this.hourStart = hourStart;
	}
	public String getHourEnd() {
		return hourEnd;
	}
	public void setHourEnd(String hourEnd) {
		this.hourEnd = hourEnd;
	}
	
	
	
	
	
public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	
//	public CalendarEvent(int calEventId, String calEventTitle, String bgColor, String price, Date fulldate,
//			String selected, boolean allDay, String avail, String hourStart, String hourEnd) {
//		super();
//		this.calEventId = calEventId;
//		this.calEventTitle = calEventTitle;
//		this.bgColor = bgColor;
//		this.price = price;
//		this.fulldate = fulldate;
//		this.selected = selected;
//		this.allDay = allDay;
//		this.avail = avail;
//		this.hourStart = hourStart;
//		this.hourEnd = hourEnd;
//	}
//	public CalendarEvent(int calEventId, String calEventTitle, String bgColor, String price, Date fulldate,
//			String selected, boolean allDay, String avail) {
//		super();
//		this.calEventId = calEventId;
//		this.calEventTitle = calEventTitle;
//		this.bgColor = bgColor;
//		this.price = price;
//		this.fulldate = fulldate;
//		this.selected = selected;
//		this.allDay = allDay;
//		this.avail = avail;
//	}
//	public CalendarEvent(int calEventId, String calEventTitle, String bgColor, String price, Date fulldate) {
//		super();
//		this.calEventId = calEventId;
//		this.calEventTitle = calEventTitle;
//		this.bgColor = bgColor;
//		this.price = price;
//		this.fulldate = fulldate;
//	}
//	
//	public CalendarEvent(int calEventId, String calEventTitle, String bgColor) {
//		super();
//		this.calEventId = calEventId;
//		this.calEventTitle = calEventTitle;
//		this.bgColor = bgColor;
//	}
	public CalendarEvent(int calEventId) {
		super();
		this.calEventId = calEventId;
	}
	
	public CalendarEvent() {
		super();
		
	}
}
