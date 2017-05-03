package data;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import entities.Todo;
import entities.User;

@Transactional
@Repository
public class TodoDAOImpl implements TodoDAO {
	
	@PersistenceContext
	private EntityManager em;

	@Override
	public Set<Todo> index(int uid) {
		  User managedUser = null;

		  try {
		      String q = "SELECT u FROM User u JOIN FETCH u.todos WHERE u.id = :id";
		      managedUser = em.createQuery(q, User.class).setParameter("id", uid).getSingleResult();
		  } catch (Exception e) {
		      // TODO: handle exception
		      e.printStackTrace();
		      String q = "SELECT u FROM User u WHERE u.id = :id";
		      managedUser = em.createQuery(q, User.class).setParameter("id", uid).getSingleResult();
		      managedUser.setTodos(new HashSet<Todo>());
		  }
		  
		Set<Todo> todos = managedUser.getTodos();
		return todos;
	}

	@Override
	public Todo show(int uid, int tid) {
		return em.find(Todo.class, tid);
	}

	@Override
	public Todo create(int uid, String todoJson) {
		ObjectMapper mapper = new ObjectMapper();
		try{
			User u = em.find(User.class, uid);
			Todo newTodo = mapper.readValue(todoJson, Todo.class);
			newTodo.setUser(u);
			em.persist(newTodo);
			em.flush();
			return newTodo;
		}
		catch(Exception e){
			System.out.println(e);
		}
		return null;
	}

	@Override
	public Todo update(int uid, int tid, String todoJson) {
		Todo managedTodo = em.find(Todo.class, tid);
		ObjectMapper mapper = new ObjectMapper();
		try{
			Todo newTodo = mapper.readValue(todoJson, Todo.class);
			managedTodo.setTask(newTodo.getTask());
			managedTodo.setCompleted(newTodo.isCompleted());
			managedTodo.setDescription(newTodo.getDescription());
			managedTodo.setDueDate(newTodo.getDueDate());
			managedTodo.setCompleteDate(newTodo.getCompleteDate());
			return managedTodo;
		}
		catch(Exception e){
			e.printStackTrace();
		}
		return null;
		
	}

	@Override
	public Boolean destroy(int uid, int tid) {
		try{
			Todo managedTodo = em.find(Todo.class, tid);
			em.remove(managedTodo);
			return true;
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
		return false;
	}

}
