package jmlv.org.Metryc;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

public class Login {
	private static JDBCPool connectionPool;

	public String login(String email, String pass) throws SQLException, IOException{
		MetrycBuilder json = new MetrycBuilder();
		Object [] params = {email,pass};
		connectionPool = new JDBCPool();
		Connection connection = connectionPool.getConnection();
		connectionPool.executeQueryX(connection, "loginCheck", params);
		json.add("result", connectionPool.getTable());
		connectionPool.free(connection);
		return json.getMetrycBuilder();
		
	}
}
