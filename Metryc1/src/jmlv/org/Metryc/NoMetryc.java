package jmlv.org.Metryc;

import java.io.IOException;
import java.lang.reflect.Method;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * Servlet implementation class NoMetryc
 */
@WebServlet("/NoMetryc")
public class NoMetryc extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public NoMetryc() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		Class[] param = new Class[1];
		String opt = request.getParameter("opt");
		
		String resp = "";
		if (opt.equals("1")) {
			param[0] = 	Integer.class; // Integer.class
			try {
				// load the AppTest at runtime
				Class cls = Class.forName("jmlv.org.Metryc.Test");
				Object obj = cls.newInstance();
				// call the method
				Method method = cls.getDeclaredMethod("alert", param);
				MetrycBuilder jb = new MetrycBuilder();
				jb.add("Status", true);
				jb.add("Response", (String) method.invoke(obj, 1));
				resp = jb.getMetrycBuilder();
				System.out.println(opt);
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		}
		if (opt.equals("0")) {
			param[0] = 	String.class; // Integer.class
			try {
				// load the AppTest at runtime
				Class cls = Class.forName("jmlv.org.Metryc.Test");
				Object obj = cls.newInstance();
				// call the method
				Method method = cls.getDeclaredMethod("alert", param);
				MetrycBuilder jb = new MetrycBuilder();
				jb.add("Status", true);
				jb.add("Response", (String) method.invoke(obj, "1"));
				resp = jb.getMetrycBuilder();
				System.out.println(opt);
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		}
		response.getWriter().append(resp);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}
	
	public void init() {
		Test test = new Test();
		try {
			test.init();
		} catch (IOException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		

	}

}
