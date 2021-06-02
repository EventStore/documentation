# Cloud Instance Sizing Guide

## Cloud Performance  

### Ratings  
* Micro 
* Development
* Production 

### Throughput for Production Rated Clusters

There are wide variety of factors that impact total Event throughput on cluster, including Events per batch and Event size and the active number of streams in the working set. For the production rated clusters we have profiled using single event transactions and confirmed they can operate at 20k tx/sec throughput (concurrent read and write) given the correct multiple client configuration and the given disk and Working Set. Event throughput can be increased via batching, but will be limited by the data size. Before placing any application into production it is important to performance test on the planned instance to understand these factors in your particular application. 

### Working Set:  
The number of streams being read from and written to concurrently. This recognizes that 1 million events into 1 million streams is a very different workload than 1 million events into single stream.

## Sizes

### F1  
Rating: Micro  
Working Set: 100k stream  
Disk (min): 50gb  

### C4  
Rating: Development  
Working Set: 500k streams  
Disk (min): 100GB  

### M8
Rating: Development  
Working Set: 1M streams  
Disk (min): 250 GB  

### M16  
Rating: Development / Light Production  
Working Set: 6M streams  
Disk (min): 500 GB  
Concurrent Clients (max): 20  

### M32  
Rating: Production  
Working Set: 12M streams  
Disk (min): 1TB  
Concurrent Clients (max): 250  

### M64  
Rating: Production  
Working Set: 30M streams  
Disk (min): 2TB  
Concurrent Clients (max): 500  

### M128  
Rating: Production  
Working Set: 62M streams  
Disk (min): 4TB  
Concurrent Clients (max): 500  