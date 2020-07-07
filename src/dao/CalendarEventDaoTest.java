package dao;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

import entity.CalendarEvent;

public class CalendarEventDaoTest {

	private ApplicationContext ctx;
	private CalendarEventDao calendarEventDao;
	private TransactionTemplate transactionTemplate;
    private PlatformTransactionManager transactionManager;

	@Before
	public void setUp() throws Exception {
		ctx = new ClassPathXmlApplicationContext("spring-config.xml");
		calendarEventDao = (CalendarEventDao) ctx.getBean("calEventDao");
		transactionManager = (PlatformTransactionManager) ctx.getBean("transactionManager");
		transactionTemplate = new TransactionTemplate(transactionManager);
	}
	
	@Test
	public void getCalendarEvents() {
		List<CalendarEvent> bookingList = calendarEventDao.getCalendarEvents();
		assertNotNull( bookingList );
		assertEquals(3, bookingList.size());
		for(CalendarEvent event : bookingList ) {
			System.out.println(event.getCalEventTitle() + " " + event.getBgColor() + "\t" + event.getCalEventId());
		}
		
	}
	
	@Test
	public void testGetRowCount() {
		Long count = calendarEventDao.getRowCount();
		assertEquals( 3, count );
	}
	
	
	
	@Test
	public void testAddCalendarEvent() {
    	final CalendarEvent event= new CalendarEvent();
	
	
	event.setCalEventTitle("Apothecary");
	event.setBgColor("#cde9b5");
	
	
	transactionTemplate.execute(new TransactionCallbackWithoutResult() {

	    protected void doInTransactionWithoutResult(TransactionStatus status) {
	    	calendarEventDao.addCalendarEvent(event);
	    	assertTrue( event.getCalEventId() > 0 );
	    	CalendarEvent event4 = calendarEventDao.getCalendarEventByCalendarEventId( event.getCalEventId());
	        
	    	assertEquals( event.getCalEventTitle(), event4.getCalEventTitle());
	        assertEquals( event.getBgColor(), event4.getBgColor());
	       
	        
	        status.setRollbackOnly();
	    }
	    
	});
}
	
	
	
	
	
}
