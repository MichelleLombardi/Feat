package jmlv.org.Metryc;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

public class SignUp {
	private static JDBCPool connectionPool;

	public String CheckEmail(String x) throws IOException, SQLException {
		MetrycBuilder json = new MetrycBuilder();
		connectionPool = new JDBCPool();
		Connection connection = connectionPool.getConnection();
		connectionPool.executeQueryX(connection, "emailCheck", x);
		json.add("email", connectionPool.getTable());
		connectionPool.free(connection);
		return json.getMetrycBuilder();
	}

	public String Register(String name, String lastn, String email, String pass)
			throws IOException, SQLException {
		MetrycBuilder json = new MetrycBuilder();
		Object[] params = { name, lastn, email, pass};
		connectionPool = new JDBCPool();
		Connection connection = connectionPool.getConnection();
		connectionPool.executeQueryX(connection, "register", params);
		json.add("result", connectionPool.getTable());
		connectionPool.free(connection);
		return json.getMetrycBuilder();
	}
}