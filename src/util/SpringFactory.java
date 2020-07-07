package util;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import dao.CalendarEventDao;


public class SpringFactory {

	
	//this file will create the connection to the DAO class with the application context model
		private static ApplicationContext ctx;
		private static CalendarEventDao calEventDao;
		
		
		public static CalendarEventDao getCalendarEventDao() {
			
			if(ctx==null) {
				ctx =  new ClassPathXmlApplicationContext("spring-config.xml");
			}
			calEventDao = (CalendarEventDao) ctx.getBean("calEventDao");
			
			
			return calEventDao;
		}
}
