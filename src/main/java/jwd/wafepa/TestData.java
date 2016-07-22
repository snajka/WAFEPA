package jwd.wafepa;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jwd.wafepa.model.Activity;
import jwd.wafepa.model.Address;
import jwd.wafepa.model.User;
import jwd.wafepa.service.ActivityService;
import jwd.wafepa.service.AddressService;
import jwd.wafepa.service.UserService;

@Component
public class TestData {

	@Autowired
	private ActivityService activityService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private AddressService addressService;

	@PostConstruct
	public void init(){
		Activity activity1 = new Activity();
		Activity activity2 = new Activity();
		Activity activity3 = new Activity();
		Activity activity4 = new Activity();
		Activity activity5 = new Activity();
		Activity activity6 = new Activity();
		activity1.setName("Running");
		activityService.save(activity1);
		activity2.setName("Swimming");
		activityService.save(activity2);
		activity3.setName("Rock climbing");
		activityService.save(activity3);
		activity4.setName("Jumping");
		activityService.save(activity4);
		activity5.setName("Diving");
		activityService.save(activity5);
		activity6.setName("Skydiving");
		activityService.save(activity6);
		for (int i = 1; i <= 14; i++) {
            User user = new User();
            user.setFirstname("First name " + i);
            user.setLastname("Last name " + i);
            user.setEmail("email" + i + "@example.com");
            user.setPassword("123");
            userService.save(user);

            for (int j = 1; j <= 3; j++) {
                Address address = new Address();
                address.setNumber(j + "c/7");
                address.setStreet("Narodnog fronta");

                address.setUser(user);
                user.addAddress(address);
                addressService.save(address);
            }
		}
	}
}
