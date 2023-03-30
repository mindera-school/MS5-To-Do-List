package school.mindera.toDoListAPI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import school.mindera.toDoListAPI.security.CorsFilter;

@SpringBootApplication
public class ToDoListApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ToDoListApiApplication.class, args);
	}

	@Bean
	public FilterRegistrationBean<CorsFilter> corsFilterRegistration() {
		FilterRegistrationBean<CorsFilter> registration = new FilterRegistrationBean<>();
		registration.setFilter(new CorsFilter());
		registration.addUrlPatterns("/*");
		registration.setName("corsFilter");
		registration.setOrder(1);
		return registration;
	}

}
