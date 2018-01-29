// ======================================
// Author: Ebenezer Monney
// Email:  info@ebenmonney.com
// Copyright (c) 2017 www.ebenmonney.com
// 
// ==> Gun4Hire: contact@ebenmonney.com
// ======================================

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Repositories;
using DAL.Repositories.Interfaces;

namespace DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        readonly ApplicationDbContext _context;

        ISurveyRepository _SurveyRepository;
        IParticipantRepository _ParticipantRepository;
        IEventsRepository _EventsRepository;
        IDynamicSurveyLinksRepository _DynamicSurveyLinksRepository;
        IDynamicFieldsRepository _DynamicFieldsRepository;


        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }

      

        ISurveyRepository IUnitOfWork.SurveyRepository {
            get
            {
                if (_SurveyRepository == null)
                    _SurveyRepository = new SurveyRepository(_context);

                return _SurveyRepository;
            }
          
        }

        IParticipantRepository IUnitOfWork.ParticipantRepository
        {
            get
            {
                if (_ParticipantRepository == null)
                    _ParticipantRepository = new ParticipantRepository(_context);

                return _ParticipantRepository;
            }

        }

        IEventsRepository IUnitOfWork.EventsRepository
        {
            get
            {
                if (_EventsRepository == null)
                    _EventsRepository = new EventsRepository(_context);

                return _EventsRepository;
            }

        }

        IDynamicFieldsRepository IUnitOfWork.DynamicFieldsRepository
        {
            get
            {
                if (_DynamicFieldsRepository == null)
                    _DynamicFieldsRepository = new DynamicFieldsRepository(_context);

                return _DynamicFieldsRepository;
            }
        }

        IDynamicSurveyLinksRepository IUnitOfWork.DynamicSurveyLinksRepository
        {
            get
            {
                if (_DynamicSurveyLinksRepository == null)
                    _DynamicSurveyLinksRepository = new DynamicSurveyLinksRepository(_context);

                return _DynamicSurveyLinksRepository;
            }

        }

        void IUnitOfWork.SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
