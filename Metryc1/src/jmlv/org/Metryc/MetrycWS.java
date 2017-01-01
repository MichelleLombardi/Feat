package jmlv.org.Metryc;

import java.io.IOException;
import java.rmi.RemoteException;
import java.sql.SQLException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.Vector;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.Future;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import javax.websocket.RemoteEndpoint.Async;

@ServerEndpoint("/metryc")
public class MetrycWS {
	private static Set<Session> peers = Collections.synchronizedSet(new HashSet<Session>());
	private static Vector<Session> peer = new Vector<Session>();
	private static Vector<String> data = new Vector<String>();
	private final BlockingQueue<Runnable> blockingQueue = new LinkedBlockingDeque<>();
	private static Metryc metryc;
	private static SecurityComponent security;

	// private final Semaphore Low = new Semaphore(1);
	@OnOpen
	public void onOpen(Session p) throws RemoteException {
		if (metryc == null) {
			// start();
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
		System.out.println("connected");
		peer.add(p);
	}

	@OnClose
	public void onClose(Session p) {
		peer.remove(p);
	}

	@OnMessage
	public void onMessage(String message, Session p) throws SecurityComponent, IOException, InterruptedException {
//		System.out.println("NEW MESSAGE: " + message +"SESSION: "+p);
//		metryc.setRequest(message, p);
		metryc.setRequest(message, peer);
	}



}
