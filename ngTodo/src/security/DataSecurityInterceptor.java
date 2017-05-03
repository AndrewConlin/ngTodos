package security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class DataSecurityInterceptor implements HandlerInterceptor{
	
	  @Override
	  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

		 if (request.getSession().getAttribute("user") != null) {
	      return true;
	    }
	    
	    response.sendRedirect("/ngTodo/api/auth/unauthorized");
	    return false;
	  }

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
			//unimplemented 
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
			//unimplemented 
	}
}
