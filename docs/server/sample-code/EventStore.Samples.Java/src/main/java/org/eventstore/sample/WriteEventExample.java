package org.eventstore.sample;

import akka.actor.*;
import akka.event.Logging;
import akka.event.LoggingAdapter;
import eventstore.j.*;
import eventstore.core.*;
import eventstore.akka.Settings;
import eventstore.akka.tcp.ConnectionActor;

import java.net.InetSocketAddress;
import java.util.UUID;

public class WriteEventExample {
    public static void main(String[] args) {
        // #region connection
        final ActorSystem system = ActorSystem.create();
        final Settings settings = new SettingsBuilder()
                .address(new InetSocketAddress("127.0.0.1", 1113))
                .defaultCredentials("admin", "changeit")
                .build();
        final ActorRef connection = system.actorOf(ConnectionActor.getProps(settings));
        // #endregion connection

        // #region writeEvent
        final ActorRef writeResult = system.actorOf(Props.create(WriteResult.class));

        final EventData event = new EventDataBuilder("event-type")
                .eventId(UUID.randomUUID())
                .jsonData("{\"a\": \"1\"}")
                .build();

        final WriteEvents writeEvents = new WriteEventsBuilder("newstream")
                .addEvent(event)
                .expectAnyVersion()
                .build();

        connection.tell(writeEvents, writeResult);
        // #endregion writeEvent
    }

    // #region writeResult
    public static class WriteResult extends AbstractActor {

        final LoggingAdapter log = Logging.getLogger(getContext().system(), this);

        @Override
        public Receive createReceive() {
            return receiveBuilder()
                    .match(WriteEventsCompleted.class, m -> {
                        log.info("range: {}, position: {}", m.numbersRange(), m.position());
                        context().system().terminate();
                    })
                    .match(Status.Failure.class, f -> {
                        final EsException exception = (EsException) f.cause();
                        log.error(exception, exception.toString());
                    })
                    .build();
        }
    }
    // #endregion writeResult
}
