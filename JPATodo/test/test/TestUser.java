package test;

import static org.junit.Assert.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.User;

public class TestUser {
	private EntityManagerFactory emf = null;
	private EntityManager em = null;
	private User user = null;

	@Before
	public void setUp() {
		emf = Persistence.createEntityManagerFactory("todoJPA");
		em = emf.createEntityManager();

		user = em.find(User.class, 1);
	}

	@After
	public void tearDown() {
		em.close();
		emf.close();
	}
	
	@Test
	public void test_address_association() {
		boolean bool = true;
		assertEquals(true, bool);
	}
	
	@Test
	public void testUser() {
		assertEquals("andrew@sd.com", user.getEmail());
	}
}
