package jwd.wafepa.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import jwd.wafepa.model.User;
import jwd.wafepa.repository.UserRepository;
import jwd.wafepa.service.UserService;

@Service
public class JpaUserService implements UserService {
	@Autowired
	private UserRepository userRepository;

	@Override
	public User findOne(Long id) {
		return userRepository.findOne(id);
	}

	@Override
	public Page<User> findAll(int page, int itemsPerPage, Sort.Direction direction, String property) {
		
		return userRepository.findAll(new PageRequest(page, itemsPerPage, direction, property));
	}

	@Override
	public User save(User user) {
		return userRepository.save(user);
	}

	@Override
	public void delete(Long id) {
		userRepository.delete(id);
	}

	@Override
	public Page<User> findByFirstnameContainsOrLastnameContainsAllIgnoreCase(int page, String name) {
		return userRepository.findByFirstnameContainsOrLastnameContainsAllIgnoreCase(new PageRequest(page, 5), name, name);
	}

	@Override
	public Page<User> findByEmailContainsOrWebsiteContains(int page, String name) {
		return userRepository.findByEmailContainsOrWebsiteContains(new PageRequest(page, 5), name, name);
	}

}
