package org.eventstore.sample;

import java.net.InetSocketAddress;
import akka.actor.*;
import akka.actor.Status.Failure;
import akka.event.*;
import eventstore.j.*;
import eventstore.core.*;
import eventstore.akka.Settings;
import eventstore.akka.tcp.ConnectionActor;

public class ReadMultipleEventsExample {

    public static void main(String[] args) {
        final ActorSystem system = ActorSystem.create();
        final Settings settings = new SettingsBuilder()
                .address(new InetSocketAddress("127.0.0.1", 1113))
                .defaultCredentials("admin", "changeit")
                .build();
        final ActorRef connection = system.actorOf(ConnectionActor.getProps(settings));
        final ActorRef readResult = system.actorOf(Props.create(ReadResult.class));
        
        final ReadStreamEvents readEvents = new ReadStreamEventsBuilder("newstream")
                .maxCount(10)
                .resolveLinkTos(false)
                .requireMaster(true)
                .build();

        connection.tell(readEvents, readResult);
    }

    public static class ReadResult extends AbstractActor {
        final LoggingAdapter log = Logging.getLogger(getContext().system(), this);
        @Override
        public Receive createReceive() {
            return receiveBuilder()
                    .match(ReadStreamEventsCompleted.class, m -> {
                        // List<Event> events = m.events();
                        // for(Event event:m.events()) {
                            
                        // }
                        log.info(m.events().toString());
                        // final Event event = m.event();
                        // log.info("event: {}", event);
                        context().system().terminate();
                    })
                    .match(Failure.class, f -> {
                        final EsException exception = (EsException) f.cause();
                        log.error(exception, exception.toString());
                        context().system().terminate();
                    })
                    .build();
        }
    }
}