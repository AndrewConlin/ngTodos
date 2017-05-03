package data;

import entities.User;

public interface AuthDAO {
	public User register (User newUser);
	public User login (User user);
}
