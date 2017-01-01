package jmlv.org.Metryc;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Feat
 */
@WebServlet("/Feat")
public class Feat extends HttpServlet {
	private static final long serialVersionUID = 1L;
	public static Metryc metryc;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Feat() {
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
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String data = request.getParameter("request");
		PrintWriter out = response.getWriter();
		String response1;
		try {
			response1 = metryc.add(data);// Without Security
			System.out.println("RESPONSE:" + response1);
			System.out.println("-----------------------------------------------------------------");
			out.print(response1);
		} catch (SecurityComponent e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	protected void doPut(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	protected void doDelete(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	public void init() {
		metryc = new Metryc();
		SecurityComponent security = new SecurityComponent();
		security.Deactivate();
		// security.initialize("03");
		System.out.println("init");
		Test test = new Test();
		try {
			JDBCPool connectionPool = new JDBCPool("04");
		} catch (IOException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
