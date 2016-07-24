package jwd.wafepa.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import jwd.wafepa.model.User;

@Repository
public interface UserRepository 
	extends JpaRepository<User, Long> {

	Page<User> findByFirstnameContainsOrLastnameContainsAllIgnoreCase(Pageable page, 
			String firstnamePart, String lastnamePart);

	Page<User> findByEmailContainsOrWebsiteContains(Pageable page, String emailPart, String websitePart);

}
