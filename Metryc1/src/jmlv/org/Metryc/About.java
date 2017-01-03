package jmlv.org.Metryc;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

public class About {
	private static JDBCPool connectionPool;
public String getInfo() throws SQLException, IOException{
		MetrycBuilder json = new MetrycBuilder();
		connectionPool = new JDBCPool();
		Connection connection = connectionPool.getConnection();
		connectionPool.executeQuery(connection, "getInfo");
		json.add("Info", connectionPool.getTable());
		connectionPool.free(connection);
		return json.getMetrycBuilder();
}

}
