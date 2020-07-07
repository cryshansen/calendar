package dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import entity.CalendarEvent;
public class CalendarEventDao extends HibernateDaoSupport {

	@SuppressWarnings("unchecked")
	public List<CalendarEvent> getCalendarEvents(){
		
		return getHibernateTemplate().loadAll(CalendarEvent.class);
		

	}
	public  CalendarEvent getCalendarEventByCalendarEventId(int cEventId) {
		 return (CalendarEvent) getHibernateTemplate().get(CalendarEvent.class, cEventId);
	}
	
	public void addCalendarEvent(CalendarEvent cEvent) {
		
		getHibernateTemplate().save(cEvent);
	}
	
	
	
	public Long getRowCount() {
		Session dbSession = getSession();
		Query dbQuery= dbSession.createQuery(
			"select count(calEventId) from entity.CalendarEvent");
		Long count = (Long) dbQuery.uniqueResult();
		dbSession.close();
		return count;
	}
	
	
	
}
