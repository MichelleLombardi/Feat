package jmlv.org.Metryc;


import java.sql.*;
import java.util.*;

/** A class for preallocating, recycling, and managing
 *  JDBC connections.
 *  <P>
 *  Taken from Core Servlets and JavaServer Pages
 *  from Prentice Hall and Sun Microsystems Press,
 *  http://www.coreservlets.com/.
 *  &copy; 2000 Marty Hall; may be freely used or adapted.
 */

public class ConnectionPool implements Runnable {
  private String driver, url, username, password;
  private int maxConnections;
  private boolean waitIfBusy;
  private Vector availableConnections, busyConnections;
  private boolean connectionPending = false;
  private Connection connection;
  private Statement statement;
  private PreparedStatement preparedStatement;
  private ResultSet resultSet; 
  private String[] columns;
  private String[][] rows;
  private ReadConfig dbc = new ReadConfig();

  public ConnectionPool(String con[],boolean waitIfBusy) throws SQLException {
    this.driver = con[0];
    this.url = con[1];
    this.username = con[2];
    this.password = con[3];
    this.maxConnections = Integer.parseInt(con[4]);
   int initialConnections = Integer.parseInt(con[5]);
    this.waitIfBusy = waitIfBusy;
    if (initialConnections > maxConnections) {
      initialConnections = maxConnections;
    }
    availableConnections = new Vector(initialConnections);
    busyConnections = new Vector();
    for(int i=0; i<initialConnections; i++) {
      availableConnections.addElement(makeNewConnection());
    }
  }
  
  public synchronized Connection getConnection() throws SQLException {
    if (!availableConnections.isEmpty()) {
      Connection existingConnection = (Connection)availableConnections.lastElement();
      int lastIndex = availableConnections.size() - 1;
      availableConnections.removeElementAt(lastIndex);
      // If connection on available list is closed (e.g.,
      // it timed out), then remove it from available list
      // and repeat the process of obtaining a connection.
      // Also wake up threads that were waiting for a
      // connection because maxConnection limit was reached.
      if (existingConnection.isClosed()) {
        notifyAll(); // Freed up a spot for anybody waiting
        return(getConnection());
      } else {
        busyConnections.addElement(existingConnection);
        return(existingConnection);
      }
    } else {
      
      // Three possible cases:
      // 1) You haven't reached maxConnections limit. So
      //    establish one in the background if there isn't
      //    already one pending, then wait for
      //    the next available connection (whether or not
      //    it was the newly established one).
      // 2) You reached maxConnections limit and waitIfBusy
      //    flag is false. Throw SQLException in such a case.
      // 3) You reached maxConnections limit and waitIfBusy
      //    flag is true. Then do the same thing as in second
      //    part of step 1: wait for next available connection.
      
      if ((totalConnections() < maxConnections) &&
          !connectionPending) {
        makeBackgroundConnection();
      } else if (!waitIfBusy) {
        throw new SQLException("Connection limit reached");
      }
      // Wait for either a new connection to be established
      // (if you called makeBackgroundConnection) or for
      // an existing connection to be freed up.
      try {
        wait();
      } catch(InterruptedException ie) {}
      // Someone freed up a connection, so try again.
      return(getConnection());
    }
  }

  // You can't just make a new connection in the foreground
  // when none are available, since this can take several
  // seconds with a slow network connection. Instead,
  // start a thread that establishes a new connection,
  // then wait. You get woken up either when the new connection
  // is established or if someone finishes with an existing
  // connection.

  private void makeBackgroundConnection() {
    connectionPending = true;
    try {
      Thread connectThread = new Thread(this);
      connectThread.start();
    } catch(OutOfMemoryError oome) {
      // Give up on new connection
    }
  }

  public void run() {
    try {
      Connection connection = makeNewConnection();
      synchronized(this) {
        availableConnections.addElement(connection);
        connectionPending = false;
        notifyAll();
      }
    } catch(Exception e) { // SQLException or OutOfMemory
      // Give up on new connection and wait for existing one
      // to free up.
    }
  }

  // This explicitly makes a new connection. Called in
  // the foreground when initializing the ConnectionPool,
  // and called in the background when running.
  
  private Connection makeNewConnection()
      throws SQLException {
    try {
      // Load database driver if not already loaded
      Class.forName(driver);
      // Establish network connection to database
      Connection connection =
        DriverManager.getConnection(url, username, password);
      return(connection);
    } catch(ClassNotFoundException cnfe) {
      // Simplify try/catch blocks of people using this by
      // throwing only one exception type.
      throw new SQLException("Can't find class for driver: " +
                             driver);
    }
  }

  public synchronized void free(Connection connection) {
    busyConnections.removeElement(connection);
    availableConnections.addElement(connection);
    // Wake up threads that are waiting for a connection
    notifyAll(); 
  }
    
  public synchronized int totalConnections() {
    return(availableConnections.size() +
           busyConnections.size());
  }

  /** Close all the connections. Use with caution:
   *  be sure no connections are in use before
   *  calling. Note that you are not <I>required</I> to
   *  call this when done with a ConnectionPool, since
   *  connections are guaranteed to be closed when
   *  garbage collected. But this method gives more control
   *  regarding when the connections are closed.
   */

  public synchronized void closeAllConnections() {
    closeConnections(availableConnections);
    availableConnections = new Vector();
    closeConnections(busyConnections);
    busyConnections = new Vector();
  }

  private void closeConnections(Vector connections) {
    try {
      for(int i=0; i<connections.size(); i++) {
        Connection connection =
          (Connection)connections.elementAt(i);
        if (!connection.isClosed()) {
          connection.close();
        }
      }
    } catch(SQLException sqle) {
      // Ignore errors; garbage collect anyhow
    }
  }
  
  public synchronized String toString() {
    String info =
      "ConnectionPool(" + url + "," + username + ")" +
      ", available=" + availableConnections.size() +
      ", busy=" + busyConnections.size() +
      ", max=" + maxConnections;
    return(info);
  }
  

  public ConnectionPool executeQuery (Connection connection, String query) {
  	
      try {
      	query = dbc.getQuery(query).toUpperCase();
      	if(String.valueOf(query.charAt(0)).equals("S")){
      		this.statement  = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
                      ResultSet.CONCUR_READ_ONLY);
  			this.resultSet = this.statement.executeQuery(query);  			
          }

      } catch (Exception e) {
          e.printStackTrace();
      }
      return this;
  }
  
public ConnectionPool executeQueryX (Connection connection, String query, Object... params) {
      try {
      	query = dbc.getQuery(query).toUpperCase();
      		 this.preparedStatement  = connection.prepareStatement(query, ResultSet.TYPE_SCROLL_SENSITIVE,
                      ResultSet.CONCUR_READ_ONLY);
      		for(int i=0;i<params.length;i++){
              	this.preparedStatement.setObject((i+1),params[i]);
                  }
  			this.resultSet = this.preparedStatement.executeQuery();  

      } catch (Exception e) {
          e.printStackTrace();
      }
      return this;
  }
  
  public ConnectionPool execute (Connection connection, String query, Object... params) {  
       try {
      	 query = dbc.getQuery(query).toUpperCase();
      	 if(String.valueOf(query.charAt(0))!="S"){
              this.preparedStatement  = connection.prepareStatement(query);
              for(int i=0;i<params.length;i++){
              	this.preparedStatement.setObject((i+1),params[i]);
                  }
  			this.preparedStatement.execute();
      	 }

       } catch (Exception e) {
           e.printStackTrace();
       }
		return this;
  }
     
  

  public String[][] getTable () {
  	String[][] tabla = this.create(this.resultSet);
  	return tabla;
  }


  public String[][] create(ResultSet rs) {
      try {
          ResultSetMetaData rsmd = rs.getMetaData();
          rs.last();
          int rows = rs.getRow();
          this.columns = new String[rsmd.getColumnCount()];
          this.rows = new String[rows+1][this.columns.length];
          rs.beforeFirst();
          for (int i = 0; i < this.columns.length; i++) {
              this.columns[i] = rsmd.getColumnName(i+1);
          }

          for (int i = -1; rs.next(); i++) {
              for (int j = 0; j < this.columns.length; j++) {
              	if(i==(-1)){
              		this.rows[i+1][j]= this.columns[j];
              		this.rows[i+2][j]= rs.getObject(j + 1).toString();
              	}else{
              		this.rows[i+2][j]= rs.getObject(j + 1).toString();}
              }
          }
      } catch (Exception e){
          e.printStackTrace();
      }
      return this.rows;
  } 
  
  public void close () {
      try {
          if (this.connection != null) this.connection.close();
          if (this.statement != null) this.statement.close();
          if (this.preparedStatement != null) this.preparedStatement.close();
          if (this.resultSet != null) this.resultSet.close();
      } catch (SQLException sqlE) {
          sqlE.printStackTrace();
      }
  }
}