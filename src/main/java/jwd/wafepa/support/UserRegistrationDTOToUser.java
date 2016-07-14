package jwd.wafepa.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import jwd.wafepa.model.User;
import jwd.wafepa.service.UserService;
import jwd.wafepa.web.dto.UserRegistrationDTO;

@Component
public class UserRegistrationDTOToUser implements Converter<UserRegistrationDTO, User>  {

	@Autowired
	private UserService userService;
	
	@Override
	public User convert(UserRegistrationDTO dto) {
		User user = new User();
		if(dto.getId()!=null){
			user = userService.findOne(dto.getId());
			
			if(user == null){
				throw new IllegalStateException("Tried to "
						+ "modify a non-existant user");
			}
		}
		
		user.setId(dto.getId());
		user.setFirstname(dto.getFirstname());
		user.setLastname(dto.getLastname());
		user.setEmail(dto.getEmail());
		user.setPassword(dto.getPassword());
		
		return user;
	}
	
	public List<User> convert(List<UserRegistrationDTO> dtos) {
		List<User> ret = new ArrayList<>();
		
		for (UserRegistrationDTO dto: dtos) {
			ret.add(convert(dto));
		}
		
		return ret;
	}
}
