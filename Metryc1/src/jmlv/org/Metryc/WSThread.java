package jmlv.org.Metryc;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Vector;
import java.util.concurrent.Semaphore;

import javax.websocket.Session;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class WSThread {
	public static Metryc metryc;
	private static SecurityComponent security;
	private static Vector<Object[]> Highrequests = new Vector<Object[]>();
	private static Vector<Object[]> Lowrequests = new Vector<Object[]>();
	private final Semaphore Low = new Semaphore(1);
	private static Integer count;
	private static Integer count2;
	private static Long start_time;

	public WSThread() {
		count = 0;
		count2 = 0;
		final Thread low = new Thread(new Runnable() {
			@Override
			public void run() {
				while (true) {
					synchronized (Lowrequests) {
						// if(Highrequests.size()<1){
						if (!Lowrequests.isEmpty()) {
							long time = System.currentTimeMillis();
							if (time > (start_time + 500)) {
								System.out.println("TIMEOUT");
								start_time = System.currentTimeMillis();
								count = 10;
							}
							if (count >= 10 && count<12) {
								count = 0;
								try {
//									System.out.println(Lowrequests.size());
									// if(Highrequests.isEmpty()){
									Low.acquire();
									Object[] obj = Lowrequests.get(0);
									Lowrequests.remove(0);
									String data = (String) obj[0];
									Session p = (Session) obj[1];
									while (metryc.add(data, p) == null) {
										System.out.println("WHILE");
									}
									Low.release();
								}
								// }
								catch (InterruptedException | SecurityComponent e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
								} catch (IOException e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
								}
							}
						} else {
							count = 0;
						}
					}
				}
				// }

			}
		});

		final Thread high = new Thread(new Runnable() {
			@Override
			public void run() {
				while (true) {
					synchronized (Highrequests) {
						if (!Highrequests.isEmpty()) {
							try {
								Object[] obj = Highrequests.get(0);
								Highrequests.remove(0);
								String data = (String) obj[0];
								Session p = (Session) obj[1];
								metryc.add(data, p);
							} catch (IOException | SecurityComponent e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
						}
					}
				}

			}
		});
		high.start();
		low.start();
		metryc = new Metryc();
		security = new SecurityComponent();
		security.Deactivate();
		// security.initialize("03");
		System.out.println("init");
		Test test = new Test();
		try {
			test.init();
		} catch (IOException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void setRequest(String message, Session p) {
		JsonElement jelement = new JsonParser().parse(message);
		JsonObject request = jelement.getAsJsonObject();
		JsonObject high = request.getAsJsonObject("high");
		JsonObject low = request.getAsJsonObject("low");
		String HighMethod = "";
		String LowMethod = "";
		Object[] req = { message, p };
		if (high != null)
			HighMethod = high.get("package").getAsString();
		if (low != null)
			LowMethod = low.get("package").getAsString();
		if (!HighMethod.equals("")) {
			count2++;
			if (count2 > (count * 2)) {
				count += 1;
			}

			Highrequests.add(req);
		}
		if (!LowMethod.equals("")) {
			if (count == 0) {
				start_time = System.currentTimeMillis();
			}
			count++;
			Lowrequests.add(req);
			// waitLow(req);
		}

	}

	public boolean waitLow(Object[] req) {

		return false;

	}

}
