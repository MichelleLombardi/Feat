package jmlv.org.Metryc;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.concurrent.TimeUnit;

public class Test {
	private static JDBCPool connectionPool;

	public String alert() throws IOException, SQLException {
		// ArrayRecord w = new ArrayRecord(x);
		// JBuilder json = new JBuilder();
		// DBComponent connectionPool = new DBComponent("03",true);
		// Connection connection;
		// connection = connectionPool.getConnection();
		// connectionPool.executeQueryX(connection,"testQuery","a@a.com");
		// json.add("query", connectionPool.getTable());
		// json.add("status", "true");
		// json.add("response", w.record[1].get[2]+"");
		// return json.getJBuilder();
		return "works";
	}

	public String init() throws IOException, SQLException {
		
		// ArrayRecord w = new ArrayRecord(x);
		// JBuilder json = new JBuilder();
		// DBComponent connectionPool = new DBComponent("03",true);
		// Connection connection;
		// connection = connectionPool.getConnection();
		// connectionPool.executeQueryX(connection,"testQuery","a@a.com");
		// json.add("query", connectionPool.getTable());
		// json.add("status", "true");
		// json.add("response", w.record[1].get[2]+"");
		// return json.getJBuilder();
		return "works";
	}

	public String alert(Integer[] x) throws IOException, SQLException {
		MetrycBuilder json = new MetrycBuilder();
		connectionPool = new JDBCPool();
		Connection connection = connectionPool.getConnection();
		connectionPool.executeQuery(connection, "security");		
		json.add("json", connectionPool.getTable());
		// System.out.println(rs);
		connectionPool.free(connection);
		return "works " + x[0]+json.getMetrycBuilder();
	}

	public String alert(Integer x) throws IOException, SQLException {
		return "works " + x;
	}

	public String alert(String x) throws IOException, SQLException {
		return "works " + x;
	}

	public String alert(String x, Integer y, long w) throws IOException, SQLException, InterruptedException {
		// TimeUnit.SECONDS.sleep((long) 1);
		// System.out.println("called");
		MetrycBuilder json = new MetrycBuilder();
		// JDBCPool connectionPool;
		Connection connection = connectionPool.getConnection();
		connectionPool.executeQuery(connection, "testQuery");
		json.add("json", connectionPool.getTable());
		// System.out.println(rs);
		connectionPool.free(connection);
		return "works " + x + y + w+json.getMetrycBuilder();
	}

	public String alert(Integer x, Integer y, Integer z) throws IOException, SQLException {
		// ArrayRecord w = new ArrayRecord(x);
		// JBuilder json = new JBuilder();
		// DBComponent connectionPool = new DBComponent("03",true);
		// Connection connection;
		// connection = connectionPool.getConnection();
		// connectionPool.executeQueryX(connection,"testQuery","a@a.com");
		// json.add("query", connectionPool.getTable());
		// json.add("status", "true");
		// json.add("response", w.record[1].get[2]+"");
		// return json.getJBuilder();
		return "works " + x + " " + y + " " + z;
	}

	public String alert(String y, Integer[][] x) throws IOException, SQLException {
		// ArrayRecord w = new ArrayRecord(x);
		// JBuilder json = new JBuilder();
		// DBComponent connectionPool = new DBComponent("03",true);
		// Connection connection;
		// connection = connectionPool.getConnection();
		// connectionPool.executeQueryX(connection,"testQuery","a@a.com");
		// json.add("query", connectionPool.getTable());
		// json.add("status", "true");
		// json.add("response", w.record[1].get[2]+"");
		// return json.getJBuilder();
		return "works " + x[0][1] + " " + y;
	}
}
