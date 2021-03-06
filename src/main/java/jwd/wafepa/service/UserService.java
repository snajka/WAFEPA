package jwd.wafepa.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

import jwd.wafepa.model.User;

public interface UserService {

	User findOne(Long id);
	Page<User> findAll(int page, int itemsPerPage, Sort.Direction direction, String property);
	User save(User user);
	
	//za korisnika se u ovom primeru (bez
	//specijalnog razloga) koristi
	//varijanta brisanja koja NE vraća entitet
	void delete(Long id);
	Page<User> findByFirstnameContainsOrLastnameContainsAllIgnoreCase(int page, String name);
	Page<User> findByEmailContainsOrWebsiteContains(int page, String name); 
	
}
