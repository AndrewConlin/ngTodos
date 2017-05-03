package data;

import java.util.HashSet;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import entities.Todo;
import entities.User;

@Transactional
@Repository
public class AuthDAOImpl implements AuthDAO {
	@PersistenceContext
	private EntityManager em;

	@Autowired
	private PasswordEncoder encoder;

	@Override
	public User register(User newUser) {
		String passwordSha = encoder.encode(newUser.getPassword());
		newUser.setPassword(passwordSha);
		
		em.persist(newUser);
		em.flush();
		return newUser;
	}

	@Override
	  public User login(User u) {
	  User managedUser = null;
	  try {
	      String q = "SELECT u FROM User u JOIN FETCH u.todos WHERE u.email = :email";
	      managedUser = em.createQuery(q, User.class).setParameter("email", u.getEmail()).getSingleResult();
	  } catch (Exception e) {
	      // TODO: handle exception
	      e.printStackTrace();
	      String q = "SELECT u FROM User u WHERE u.email = :email";
	      managedUser = em.createQuery(q, User.class).setParameter("email", u.getEmail()).getSingleResult();
	      managedUser.setTodos(new HashSet<Todo>());
	  }

	  return managedUser;
	}
}
