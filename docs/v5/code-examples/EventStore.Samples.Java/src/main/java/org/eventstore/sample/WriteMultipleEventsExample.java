package org.eventstore.sample;

import java.net.URL;
import java.util.UUID;
import akka.actor.*;
import akka.event.*;
import eventstore.j.*;
import eventstore.core.*;
import eventstore.akka.tcp.ConnectionActor;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Collection;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import static org.apache.commons.io.FilenameUtils.removeExtension;

public class WriteMultipleEventsExample {
    public static void main(String[] args) {
        final ActorSystem system   = ActorSystem.create();
        final ActorRef connection  = system.actorOf(ConnectionActor.getProps());
        final ActorRef writeResult = system.actorOf(Props.create(WriteResult.class));

        URL resource = WriteMultipleEventsExample.class.getResource("json");
        File directory = new File(resource.getPath());
        Collection<File> files = FileUtils.listFiles(directory, new String[]{"json"}, true);

        for (Object file : files) {
            String streamName = FilenameUtils.getBaseName(removeExtension(file.toString()));

            JSONParser parser = new JSONParser();
            try {
                JSONArray events = (JSONArray) parser.parse(new FileReader(file.toString()));

                for (Object e : events) {
                    JSONObject event = (JSONObject) e;

                    final EventData json = new EventDataBuilder("json")
                            .eventId(UUID.fromString((String) event.get("eventId")))
                            .jsonData((event.get("data")).toString())
                            .jsonMetadata(event.get("metadata").toString())
                            .build();

                    final WriteEvents writeEvents = new WriteEventsBuilder("newstream")
                            .addEvent(json)
                            .expectAnyVersion()
                            .build();

                    connection.tell(writeEvents, writeResult);
                }
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
    }

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
}