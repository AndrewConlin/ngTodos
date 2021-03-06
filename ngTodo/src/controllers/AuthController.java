package controllers;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.AuthDAO;
import entities.User;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private AuthDAO authDAO;

	@RequestMapping(path = "/register", method = RequestMethod.POST)
	public User register(HttpSession session, @RequestBody User user) {
		try {
			User createdUser = authDAO.register(user);
			session.setAttribute("user", createdUser);
			return createdUser;
		} catch (Exception e) {
			System.out.println(e);
		}

		return null;
	}

	@RequestMapping(path = "/login", method = RequestMethod.POST)
	  public User login(HttpSession session, @RequestBody User user){
		  try{
			  User loggedInUser = authDAO.login(user);
			  session.setAttribute("user", loggedInUser);
			  return loggedInUser;
		  }
		  catch(Exception e){
			  System.out.println(e);
		  }
	  
	  	  return null;

	  }

	@RequestMapping(path = "/logout", method = RequestMethod.POST)
	public Boolean logout(HttpSession session, HttpServletResponse response) {
		session.removeAttribute("user");
		if (session.getAttribute("user") == null)
			return true;

		return false;
	}

	@RequestMapping(path = "/unauthorized")
	public String unauth(HttpServletResponse response) {
		response.setStatus(401);
		return "unauthorized";
	}
}
