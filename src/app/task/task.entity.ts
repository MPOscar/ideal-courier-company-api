import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
//
import { Company } from '../company/company.entity';
import { CompanyClient } from '../company-client/company-client.entity';
import { Driver } from '../driver/driver.entity';
import { Route } from '../route/route.entity';
import { Stop } from '../stop/stop.entity';
import { TaskScheduler } from '../task-scheduler/task-scheduler.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  comments: string;

  @Column()
  description: string;
    
  @Column()
  ipAddress: string;

  @Column()
  lat: string;

  @Column()
  lon: string;

  @Column()
  pieces: number;

  @Column({nullable: true})
  taskDate: Date;

  @Column()
  transType: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(type => Company)
  @JoinColumn({ name: "company", referencedColumnName: 'id' })
  company: Company;
  
  @ManyToOne(type => TaskScheduler)
  @JoinColumn({ name: "shedulerId", referencedColumnName: 'id' })
  sheduler: TaskScheduler;

  /*@ManyToOne(type => CompanyClient)
  @JoinColumn({ name: "company_client", referencedColumnName: 'id' })
  companyClient: CompanyClient;

  @ManyToOne(type => Driver)
  @JoinColumn({ name: "driver", referencedColumnName: 'id' })
  driver: Driver;

  @ManyToOne(type => Route)
  @JoinColumn({ name: "route", referencedColumnName: 'id' })
  route: Route;
  
  @ManyToOne(type => Stop)
  @JoinColumn({ name: "stop", referencedColumnName: 'id' })
  stop: Stop;*/
}