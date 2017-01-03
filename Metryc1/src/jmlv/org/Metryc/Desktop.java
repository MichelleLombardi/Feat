package jmlv.org.Metryc;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import com.sun.org.apache.xerces.internal.impl.xpath.regex.ParseException;

public class Desktop {
	private static JDBCPool connectionPool;

	public String newDocument(String name, Integer id) throws SQLException, IOException {
		File archivo;
		BufferedWriter escribir; // se encarga de escribir en el archivo.
		MetrycBuilder json = new MetrycBuilder();
		String currentUsersHomeDir = System.getProperty("user.home");
		String mainFolder = currentUsersHomeDir + File.separator + "Feat_documents";
		String route = mainFolder + File.separator + id + File.separator + name + ".txt";
		File documents = new File(mainFolder);

		// CREATE MAIN DIRECTORY
		if (!documents.exists()) {
			System.out.println("main");
			if (documents.mkdir()) {
				System.out.println("Directory is created!");
			} else {
				System.out.println("Failed to create directory!");
			}
		}

		// CREATE USER DIRECTORY
		File file = new File(mainFolder + File.separator + id);
		if (!file.exists()) {
			if (file.mkdir()) {
				System.out.println("Directory is created!");
			} else {
				System.out.println("Failed to create directory!");
			}
		}

		// CREATE DOCUMENT FILE
		archivo = new File(route); // se crea el archivo
		if (archivo.exists()) {
			json.add("result", 0);
		}
		if (archivo.createNewFile()) {
			System.out.println("Se ha creado el archivo.");
			escribir = new BufferedWriter(new FileWriter(archivo));
			escribir.write("");
			escribir.close();
			java.util.Date parsed;
			java.sql.Date sql = null;
			Calendar cal = Calendar.getInstance();
			String time = new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime());
			try {
				parsed = new SimpleDateFormat("yyyy-MM-dd").parse(time);
				sql = new java.sql.Date(parsed.getTime());
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (java.text.ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			Object[] params = { name, archivo.length(), sql, route };
			connectionPool = new JDBCPool();
			Connection connection = connectionPool.getConnection();
			connectionPool.executeQueryX(connection, "newDocument", params);
			String[][] result = connectionPool.getTable();
			Object[] params1 = { Integer.parseInt(result[1][0]), id, 1 };
			connectionPool.execute(connection, "UserDocument", params1);

			json.add("result", 1);
			connectionPool.free(connection);
		} // Fin if. Comprueba la creacion del archivo
		return json.getMetrycBuilder();
	}

}
