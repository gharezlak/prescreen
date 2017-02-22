Screens = new Meteor.Collection('screens');
Forms = new Meteor.Collection('forms');
NewScreen = new Meteor.Collection('newscreen');
Roles = new Meteor.Collection('roles');
Sections = new Meteor.Collection('sections');
Dashboards = new Meteor.Collection('dashboards');

Router.configure({
  loadingTemplate: 'loading'
});

Router.route('/', function() {
  if (!Meteor.user()){
    this.render('Login');
  }
  else
    this.render('Home');
  fastRender: true;
});

Router.route('/forms', function(){
  if (!Meteor.user()){
    this.render('Login')
  }
  else
    this.render("ManageForms");
  fastRender: true;
});

Router.route('/screens', function(){
  this.render("Screens");
  fastRender: true;
});

Router.route('/screens/:_id', {
  name: 'StoredScreen',
  data: function(){
    return Screens.findOne({_id: this.params._id});
  }
});

Router.route('/forms/:_id', {
  name: 'BlankForm',
  data: function(){ 
    return NewScreen.findOne({_id: this.params._id});
  }
});

Router.route('/manage/:_id', {
  name: 'ManageForm',
  data: function(){
     return Forms.findOne({_id: this.params._id});
  }
});

Router.route('/roles/:_id', {
  name: 'Roles',
  data: function(){
    return Roles.findOne({_id: this.params._id});
  }
});

Router.route('/search', function(){
  if (!Meteor.user()){
    this.render('Login')
  }
  else
    this.render("Search");
  fastRender: true;
});

Router.route('/dashboards/:_id', {
  name: 'Dashboards',
   data: function(){
     return Dashboards.findOne({_id: this.params._id});
  }
});

if (Meteor.isClient) {

  Meteor.startup(function() {
   Session.set('data_loaded', false); 
  }); 

  admin_users = [
    'aAD6rwPjiyYBwcwr3', 
    'XM7v7wCJyRDKuPmMY', 
    'BJYGRgxtEjNkYo8Eh',
    'rnXJNc4ApLHksNg9J',
    'kveaPmiqp9dMDZJYx',
    'gT73jRZoWHasW6zHs',
    'AR2qwinCiX3mi8j64',
    '2yD7ZuzgZqkmZbdyc',
    'Ev7CBvXvEiCbaQXYn',
    '6WLPm5eqZMjw6uu7W',
    'aH2pw9tvby8xKYqyR',
    'Hz4muK4xwigeG4tej',
    'xaa9LoHTFFpuzH8vf',
    '3LTscbTNZ6LztKvTX',
    'gT5yrjJQdiSt9HoeG',
    'SQsb5pzXec734FhrX',
    'Pj7vDsdhy98Sy8Euf',
    'nw3r3XvQ5HLTANWTK',
    'fNfxT2evkXwyuvNx3',
    'Ph4B3H7ArvKRBaAsT',
    'NbeSeBQYCcxeDLD62',
    'NyJygRxwfDJwLyKP6',
    'kbLPJNi8Dpakz2PYZ',
    'XrxrrFTNvLBN6Csbm',
    'X77ndPxYPgNQCcf9F',
    '9K3qownFbbGjMSFAt',
    'BYXYFFwYkTZxt4DMu',
    '922Sja4bnzEggoMF5',
    'kjiuJTe7L4uG7eHJW',
    'N8D8ZA9AkWNrtif26',
    'CRCA7CkTa2axKAieA',
    'P56MdEGebyJWZnTQG',
    'KJC4a2F4Nc8mKGtj3',
    'EyiLrveedtcvcrhgA',
    'Cs4HH6adttwrJ7JAk',
    's276HSsTtmoY8KvLD',
    '6fQ7rzHJ64H7twP99',
    'Fr7R4cPyGpKowf78C',
    'byqZjSakgmG9PNBsB',
    'sYmbe2egjDF5statC',
    'wwR24AmXATwcBrnhS',
    'wJ6qk7JXF53WYwsEv',
    'F7AhBLsd7siN5YKom',
    'AZEaPSQ8ueTyFf5Gq',
    'knaAvSQsHefrtreDs',
    '5STxhYj6ajdpfh4FN',
    'CMwBkR4ABRppW4PqA',
    'HMtKMhFLRFyTBuT8r',
    'dQ7wHTfAieKBYHAQh'
  ]

  Meteor.subscribe('screens', function(){
    //Set the reactive session as true to indicate that the data have been loaded
    Session.set('data_loaded', true); 
  });
  Meteor.subscribe('dashboards', function(){
    //Set the reactive session as true to indicate that the data have been loaded
    Session.set('dashboards_loaded', true); 
  });
  Meteor.subscribe('forms', function(){
    Session.set('forms_loaded', true);
  });
     
  Meteor.subscribe('newscreen');

  if(admin_users.indexOf(Meteor.userId())>-1){
    Meteor.subscribe("roles");
    Meteor.subscribe("sections");
    Meteor.subscribe("allUsers");
  }

  Template.Screens.helpers({
    items: function(){
      return Roles.find();
    }
  });

  Template.ScreensPanel.helpers({
      items: function(){
        return Screens.find();
      }
  });

  Template.StoredScreen.helpers({
    items: function(){
      return Forms.findOne({position_name: this.role}).interviewers;
    }
  })

  Template.ManageForm.helpers({
      items: function(){
        return Forms.find();
      },
      int_it: function(){
        return Forms.findOne({_id: window.location.href.split('manage/')[1]}).interviewers;
      }
  });

  Template.ManageForms.helpers({
      items: function(){
        return Forms.find();
      }
  });

  Template.BlankForm.helpers({
      items: function(){
        return Forms.find();
      }
  });

  Template.Search.helpers({
    items: function(){
      return Screens.find();
    },
    owners: function(){
      users = Meteor.users.find().fetch();
      results = []

      for(i=0;i<users.length;i++){
        results.push(users[i].profile);
      }

      return results;
    },
    roles: function(){
      return Roles.find();
    }
  })

  Template.Dashboards.helpers({
    items: function(){
      return Dashboards.findOne({_id: Router.current().location.get().path.split('/dashboards/')[1]}).stats;
    }
  });

  Template.Screens.onRendered(function(){
    Meteor.subscribe("screens");

    function check_screen(){
      if(Session.get('data_loaded')){
          screens = Screens.find().fetch();
          for(i=0;i<screens.length;i++){
            if(screens[i].owner == Meteor.userId()){
              screen_table = $('#my-screens-table');
              $(screen_table).append('<tr><td>'+screens[i].name+'</td></td>'+screens[i].created_at+'</td><td><a href="http://prn-prescrns01.thefacebook.com/screens/'+screens[i]._id+'">http://prn-prescrns01.thefacebook.com/screens/'+screens[i]._id+'</a></td><td><button type="button" class="delete">delete</button></td></tr>')
            }
          }
      }else{
        Meteor.setTimeout(check_screen, 1000);
      }
    }

    check_screen();
  });

  Template.StoredScreen.onRendered(function(){
    function check_box(){
      if(Session.get('data_loaded')){
        if(Screens.findOne({_id: Router.current().location.get().path.split('/screens/')[1]}).offer_received == true){
          $('#offer-box')[0].checked = true;
        }
      }else{
        Meteor.setTimeout(check_box, 1000);
      }
    }

    check_box();
  });

  Template.Dashboards.onRendered(function(){
    Meteor.subscribe("roles");
    Meteor.subscribe("dashboards");
    dash_bool = false;
    function check_dash(){
      if(Session.get('data_loaded')){
        if(Session.get('dashboards_loaded')){
          init_dash();
        }
      }else{
        Meteor.setTimeout(check_dash, 2000);
      }
    }

    check_dash();
  });

  Template.ManageForm.onRendered(function(){
    function do_work(){
      var sections = Forms.findOne({_id: Router.current().location.get().path.split('/manage/')[1]}).section_bundles;
      var counter = 0;
      for(i=0; i<sections.length; i++){
        questions = sections[i].qa_bundle;
        for(j=0; j<questions.length;j++){ 
          row = $('.question-row')[counter];
          $(row).addClass(questions[j].difficulty);
          counter += 1;
        }
      }
    }
    try{
      if(Forms.findOne({_id: Router.current().location.get().path.split('/manage/')[1]}).section_bundles){
        do_work();
      }
    }
    catch(err){
      setTimeout(do_work, 2000);
    }
  });

  Template.Search.onRendered(function(){
    nope = $('#no-results')[0];
    $(nope).hide();
  });

  Template.Home.events({
    'click #goto-role': function(){
      select_value = $('#role-select')[0].value;
      role_id = Roles.findOne({position_name: select_value})._id;
      window.location = '/roles/'+role_id;
    },
  });

  Template.Screens.events({
    'change [name=role_selector]': function(){

      if(window.location.href.split('screens').length>1){
        window.location.href = window.location.href.split('screens')[0] + 'roles/'+ Roles.findOne({position_name: $('#role-selector')[0].value})._id;
      }else{
        window.location.href = window.location.href.split('roles')[0] + 'roles/'+ Roles.findOne({position_name: $('#role-selector')[0].value})._id;
      }
    },

    'click .delete': function(e, tmpl) {
      console.log(this);
    }
  });

  Template.Roles.events({
    'click .claim': function(e, templ){
      Session.set("updateScreen", this.screen_id);
        Screens.update(
          Session.get("updateScreen"),
          {$set: 
            {
              owner: Meteor.userId()
            }
          });
      role_id = window.location.href.split('roles/')[1];
      temp_role = Roles.findOne({_id: role_id});
      for(i=0;i<temp_role.screen_bundle.length;i++){
        console.log(this.screen_id);
        if(temp_role.screen_bundle[i].screen_id == this.screen_id){
          temp_role.screen_bundle[i]['owner'] = Meteor.userId()
        }
      }
      Session.set("updateRole", role_id);
      Roles.update(
        Session.get("updateRole"),
        {$set: 
          {
            screen_bundle: temp_role.screen_bundle
          }
        });
      alert('You have claimed this screen!')
    },

    'click .delete': function(e, tmpl) {
      e.preventDefault();
      current_this = this;
      ask = confirm('Are you sure?');
      if(ask === true){
        Screens.remove(this.screen_id);

        console.log(this);

        var arr = Roles.findOne({_id: window.location.href.split('roles/')[1]})['screen_bundle']

        new_bundle=[]

        for(i=0;i<arr.length;i++){
          if(arr[i].screen_id != current_this.screen_id){
            new_bundle.push(arr[i]);
          }
        }
        console.log(new_bundle)

        Session.set("updateRole", window.location.href.split('roles/')[1]);

          Roles.update(
            Session.get("updateRole"),
            {$set: 
              {
                screen_bundle: new_bundle
              }
            });
      }
    }
  });

  Template.ScreensPanel.events({
    'click .delete': function(){
      check_delete = confirm("Are you sure?");
      if(check_delete == true){
        Screens.remove(this._id);
      } 
    }
  });

  Template.BlankForm.events({
    'click [name=restore]': function(e, templ) {
      e.preventDefault();
      new_screen = NewScreen.findOne({_id: window.location.href.split('/')[window.location.href.split('/').length-1]});
      $('input')[0].value = new_screen.first;
      for(i=0;i<new_screen.answers.length;i++){
        $('textarea')[i].value = new_screen.answers[i];
      }
    },

    'click [name=submit]': function(e, tmpl) {
      e.preventDefault();

      current_this = this;
      blanks = false;
      for(i=0;i<$('.screen-data').length;i++){
        for(j=0;j<3;j++){
          buttons = $('.correctness')[i];
          blank = $('.correctness-container')[i];
          $(blank).css('border', 'none');
          if(buttons.getElementsByTagName('input')[j].checked){
            var correctness = buttons.getElementsByTagName('input')[j].value;
            if($('.screen-data')[i].value != '' && correctness == 'not_asked'){
              blanks=true
              $(blank).css('border-style', 'solid');
              $(blank).css('border-color', 'red');
              $(blank).css('border-width', '2px');
            }
          }
        }
      }
      if(blanks){
        alert("There are one or more questions with text in the answer field that are marked 'I didn't ask'. Please fix this. #dataintegrity");
      }else{
        add_screen(current_this);
      }
      function add_screen(current_this){
        var row_counter = 0;
        var sections_data = Forms.findOne({position_name: current_this.position_name}).section_bundles;
        for(i=0;i<sections_data.length;i++){
          var temp_qa_arr = [];
          for(j=0;j<sections_data[i].qa_bundle.length;j++){
            if($('.correctness')[row_counter].getElementsByTagName('input')[0].checked || $('.correctness')[row_counter].getElementsByTagName('input')[1].checked){
              sections_data[i].qa_bundle[j]['candidate_answer'] = $('.screen-data')[row_counter].value;
              for(k=0;k<3;k++){
                buttons = $('.correctness')[row_counter];
                if(buttons.getElementsByTagName('input')[k].checked){
                  sections_data[i].qa_bundle[j]['correctness'] = buttons.getElementsByTagName('input')[k].value;
                }
              }
              temp_qa_arr.push(sections_data[i].qa_bundle[j]);
              row_counter += 1;
            }else{
              row_counter += 1;
            }
          }
          sections_data[i].qa_bundle = temp_qa_arr;
        }

        var no_blanks = false;
        while(no_blanks == false && sections_data.length>0){
          for(i=0;i<sections_data.length;i++){
            if(sections_data[i].qa_bundle.length == 0){
              sections_data.splice(i, 1);
              break;
            }else if(i == sections_data.length-1){
              no_blanks = true;
            }
          }
        }

        d = new Date;

        var newObj = {};
        newObj['name'] = $('input')[0].value;
        newObj['prescreen_notes'] = $('#prescreen-notes')[0].value;
        newObj['role'] = current_this.position_name;
        newObj['section_bundles'] = sections_data;
        newObj['interviewers'] = current_this.interviewers;
        newObj['interviews'] = [];
        newObj['owner'] = Meteor.userId();
        newObj['current_stage'] = "Completed Prescreen";
        newObj['created_at'] = d.toDateString();


        Screens.insert(newObj);

        Session.set("updateRole", Roles.findOne({position_name: current_this.position_name})._id);
          var screen_id = Screens.find().fetch()[Screens.find().fetch().length-1]._id;
          d = new Date();
          Roles.update(
            Session.get("updateRole"),
            {$push: 
              {
                screen_bundle: 
                {
                  name: $('input')[0].value,
                  created_at: d.toDateString(),
                  screen_id: screen_id,
                  owner: Meteor.userId()
                }
              }
            });

        NewScreen.remove({_id: window.location.pathname.split('/')[window.location.pathname.split('/').length-1]});

        window.location = window.location.origin+'/screens/'+Screens.find().fetch()[Screens.find().fetch().length-1]._id;  
      }
    },

    'keyup [id="on-change"]': function(e, tmpl){
      var screen_data = [];
      var name = $('input')[0].value;
      for(i=0; i<$('textarea').length;i++){
        screen_data.push($('textarea')[i].value);
      }

      Session.set("updateNewScreen", this._id);

        NewScreen.update(
          Session.get("updateNewScreen"),
          {$set: 
            {
              answers: screen_data,
              first: name
            }
          });
    }
  });

  Template.ManageForm.events({
    'click [name=submit_new]': function(e, tmpl) {
      e.preventDefault();

      this_form = Forms.findOne({_id: window.location.pathname.split('manage/')[1]}).section_bundles;
      var qa_index = this.qa_bundle.length;
      var question = tmpl.findAll('textarea[name=new_question]')[this.section_index].value;
      var correct_answer = tmpl.findAll('textarea[name=new_answer]')[this.section_index].value;
      var section = this.section;
      var bundle_array = this.qa_bundle;
      var section_index = this.section_index;
      var bundle_obj = {
        qa_index: qa_index,
        question: question,
        correct_answer: correct_answer,
        section: section,
        section_index: section_index,
        difficulty: ''
      }
      bundle_array.push(bundle_obj);
      this_form[this.section_index].qa_bundle = bundle_array;

      Session.set("updateForm", Forms.findOne({_id: window.location.pathname.split('manage/')[1]})._id);

        var section_bundles = this_form;

        Forms.update(
          Session.get("updateForm"),
          {$set: 
            {
              section_bundles: section_bundles
            }
          });

      for(i=0;i<$('.new-question').length;i++){
        $('.new-question')[i].value = '';
      }
    },


    'click [name=add_section]': function(e, tmpl) {
      e.preventDefault;
      console.log(this);
      current_sections = Forms.findOne({_id: window.location.pathname.split('manage/')[1]}).section_bundles;
      total_sections = current_sections.length;
      section_name = 'Section '+(current_sections.length+1);
      current_sections.push(
        {
          section: section_name,
          section_index: this.section_bundles.length,
          qa_bundle: 
            [
              {
                section: section_name, 
                question: 'Sample question...', 
                correct_answer: 'Sample answer...', 
                qa_index: 0, 
                section_index: total_sections,
                difficulty: ''
              }
            ]
        });
      
      Session.set("updateForm", window.location.pathname.split('manage/')[1]);
        section_bundles = current_sections;

        Forms.update(
          Session.get("updateForm"),
          {$set: 
            {
              section_bundles: section_bundles
            }
          });
    },

    'click .edit-delete': function(e, tmpl) {
      e.preventDefault;
      var current_bundle = [];
      var index;
      var this_form = Forms.findOne({_id: window.location.pathname.split('manage/')[1]}).section_bundles;
      for(i=0;i<this_form.length;i++){
        console.log(this)
        if(this_form[i].section == this.section){
          current_bundle = this_form[i].qa_bundle;
          index = this_form[i].section_index;
          break;
        }
      }

      current_bundle.splice(this.qa_index, 1);
      for(i=0;i<current_bundle.length; i++){
        current_bundle[i]['qa_index'] = i;
      }

      this_form[index].qa_bundle = current_bundle;

      Session.set("updateForm", Router.current().location.get().path.split('/manage/')[1]);
        var section_bundles = this_form;

        Forms.update(
          Session.get("updateForm"),
          {$set: 
            {
              section_bundles: section_bundles
            }
          });

      var rows = $('.question-row');
      for(i=0;i<rows.length;i++){
        rows[i].className = 'question-row';
      }
      var sections = Forms.findOne({_id: Router.current().location.get().path.split('/manage/')[1]}).section_bundles;   
      var difficulties = [];

      for(i=0; i<sections.length; i++){
        questions = sections[i].qa_bundle;
        for(j=0; j<questions.length;j++){ 
          difficulties.push(questions[j].difficulty);
        }
      }

      setTimeout(add_diffs, 50);

      function add_diffs(){
        for(i=0;i<$('.question-row').length;i++){
          row = $('.question-row')[i];
          $(row).addClass(difficulties[i]);
        }
      }
    },

    'keypress .new-question': function(e, tmpl){
      if(e.keyCode==13){
        enter_key = $('.submit-new')[this.section_index];
        $(enter_key).click();

        for(i=0;i<$('.new-question').length;i++){
        $('.new-question')[i].value = '';
      }
      }

      
    },

    'click [name=edit_order]': function(e, templ){
      for(i=0;i<$('.question').length; i++){
        question = $('question')[i];
        answer = $('.answer')[i];
        btn = $('.update-question')[i];
        $(question).attr("contentEditable", false);
        $(answer).attr("contentEditable", false);
        
        if($('.update-question')[i].getAttribute('class')=="update-question hide"){
        }else{
          $(btn).addClass('hide');
        }
      }

      drag_box = $('.dragula')[this.section_index];
      $(drag_box).addClass('edit-border');
      var section = this.section_index;
      var edit_bttn = $('.edit-order')[this.section_index];
      if($(edit_bttn).attr('src') == '/edit_order2.png'){
        for(i=0;i<$('.difficulty').length;i++){
          d_form = $('.difficulty')[i];
          $(d_form).addClass('hide');
        }
        $(edit_bttn).attr('src','/save_order2.png');
        var containers = [$('.dragula').toArray()[section]];
        dragula(containers);
      }else{
        save_order();
      }
      
      function save_order(){
        $('body').hide();
        sections = $('.section');
        new_sections = [];
        for(i=0;i<sections.length;i++){
          this_section = sections[i];
          section_name = Forms.findOne({_id: window.location.pathname.split('manage/')[1]}).section_bundles[i].section;
          section_index = i;     
          new_qa_bundle = [];
          for(j=0;j<$(this_section).find('.question').length;j++){
            q_obj = {};
            question = $(this_section).find('.question')[j];
            answer = $(this_section).find('.answer')[j];
            diff_elm = $(this_section).find('.question-row')[j]
            q_obj['question'] = question.innerHTML;
            q_obj['correct_answer'] = answer.innerHTML;
            q_obj['qa_index'] = j;
            q_obj['section_index'] = i;
            q_obj['section_name'] = section_name;
            q_obj['difficulty'] = $(diff_elm).attr('class').split('question-row ')[1];
            new_qa_bundle.push(q_obj);
            console.log('question: '+q_obj['question']);
            console.log('question: '+q_obj['correct_answer']);
          }

          console.log('new_qa_bundle: '+new_qa_bundle);
          var section_obj = 
            {
              qa_bundle: new_qa_bundle,
              section: section_name,
              section_index: section_index
            }
          new_sections.push(section_obj);
        }

        console.log('new_sections: '+new_sections[0]['qa_bundle'][0]['question']);

        Session.set("updateForm", window.location.pathname.split('manage/')[1]);

          var section_bundles = new_sections;

          Forms.update(
            Session.get("updateForm"),
            {$set: 
              {
                section_bundles: section_bundles
              }
            });
          location.reload();
        }
      },

      'click [name=remove_section]': function(e, templ){
        check = confirm('Are you sure you want to delete this section?');
        if(check){
          var current_sections = Forms.findOne({_id: window.location.pathname.split('manage/')[1]}).section_bundles;
          current_sections.splice(this.section_index, 1);
          for(i=0;i<current_sections.length;i++){
            current_sections[i].section_index = i;
            for(j=0;j<current_sections[i].qa_bundle.length;j++){
              current_sections[i].qa_bundle[j].section_index = i;
            }
          }
          
          Session.set("updateForm", window.location.pathname.split('manage/')[1]);

          var section_bundles = current_sections;

          Forms.update(
            Session.get("updateForm"),
            {$set: 
              {
                section_bundles: section_bundles
              }
            });
        }
        location.reload();
      },

      'click .btnReadCsv': function(event, template) {
        Papa.parse(template.find('#csv-file').files[0], {
            header: true,
            complete: function(results) {
                new_bundle = results.data;
                section_names = [];
                sections = []
                qa_bundles = []
                for(i=0;i<new_bundle.length;i++){
                  if(section_names.indexOf(new_bundle[i].section)==-1){
                    section_names.push(new_bundle[i].section)
                  }
                }

                for(i=0;i<section_names.length;i++){
                  new_qa_arr = [];
                  for(j=0;j<new_bundle.length;j++){
                    if(new_bundle[j].section == section_names[i]){
                      new_bundle[j].section_index = i;
                      new_qa_arr.push(new_bundle[j]);
                    }
                  }
                  qa_bundles.push(new_qa_arr);
                }

                for(i=0;i<qa_bundles.length;i++){
                  for(j=0;j<qa_bundles[i].length;j++){
                    qa_bundles[i][j].qa_index = j;
                  }
                }

                for(i=0;i<section_names.length;i++){
                  var sectionObj={};
                  sectionObj.section = section_names[i];
                  sectionObj.section_index = i;
                  sectionObj.qa_bundle = qa_bundles[i];
                  sections.push(sectionObj);
                }

                console.log(qa_bundles);
                console.log(section_names);

                Session.set("updateForm", Router.current().location.get().path.split('/manage/')[1]);

                  var section_bundles = sections

                  Forms.update(
                    Session.get("updateForm"),
                    {$set: 
                      {
                        section_bundles: section_bundles
                      }
                    });
            },
            skipEmptyLines: true
        });
        location.reload();
      },

      'change [name=difficulty]': function(event, template){
        var sections = Forms.findOne({_id: window.location.pathname.split('manage/')[1]}).section_bundles;
        var diff_counter = 0
        if(sections.length == 0){
          diff_counter = this.qa_index;
        }else{
          for(i=0;i<this.section_index;i++){
            diff_counter += sections[i].qa_bundle.length;
          }
          diff_counter += this.qa_index;
        }
        var temp = $('.difficulty')[diff_counter];
        var my_obj;
        if(temp.value == "hard"){
          question = $(".question-row")[diff_counter];
          $(question).removeClass('medium');
          $(question).removeClass('easy');
          $(question).removeClass('na');
          $(question).addClass('hard');
          my_obj = this;
          update_difficulty("hard");
        }else if(temp.value == "medium"){
          question = $(".question-row")[diff_counter];
          $(question).removeClass('easy');
          $(question).removeClass('hard');
          $(question).removeClass('na');
          $(question).addClass('medium');
          my_obj = this;
          update_difficulty("medium");
        }else if(temp.value == "easy"){
          question = $(".question-row")[diff_counter];
          $(question).removeClass('medium');
          $(question).removeClass('hard');
          $(question).removeClass('na');
          $(question).addClass('easy');
          my_obj = this;
          update_difficulty("easy");
        }else if(temp.value == "na"){
          question = $(".question-row")[diff_counter]
          $(question).removeClass('medium');
          $(question).removeClass('easy');
          $(question).removeClass('hard');
          $(question).addClass('na');
          my_obj = this;
          update_difficulty("na");
        }
        function update_difficulty(new_d){
          var current_bundle = [];
          var this_form = Forms.findOne({_id: window.location.pathname.split('manage/')[1]}).section_bundles;
          var this_section = this_form[my_obj.section_index];
          this_section.qa_bundle[my_obj.qa_index]['difficulty'] = new_d;

          this_form[my_obj.section_index] = this_section;

          Session.set("updateForm", Router.current().location.get().path.split('/manage/')[1]);
            var section_bundles = this_form;

            Forms.update(
              Session.get("updateForm"),
              {$set: 
                {
                  section_bundles: section_bundles
                }
              });
          }
      },

      'keyup [name=new_section]': function(e, templ) {
        this_form = Forms.findOne({_id: Router.current().location.get().path.split('/manage/')[1]}).section_bundles;
        section_name = $('.section-name')[this.section_index].value;
        this_form[this.section_index].section = section_name;
        for(i=0;i<this_form[this.section_index]['qa_bundle'].length;i++){
          this_form[this.section_index]['qa_bundle'][i]['section'] = section_name;
        }
        
        Session.set("updateForm", Router.current().location.get().path.split('/manage/')[1]);
            var section_bundles = this_form;

            Forms.update(
              Session.get("updateForm"),
              {$set: 
                {
                  section_bundles: section_bundles
                }
              });
      },

      'click [name=update_question]': function(e, templ){
          sections = Forms.findOne({_id: Router.current().location.get().path.split('/manage/')[1]}).section_bundles;
          counter = 0;
          for(i=0;i<sections.length;i++){
            for(j=0;j<sections[i].qa_bundle.length;j++){
              question_obj = $('.question')[counter];
              answer_obj = $('.answer')[counter];
              sections[i].qa_bundle[j].question = $(question_obj).text();
              sections[i].qa_bundle[j].correct_answer = $(answer_obj).text();
              counter += 1;
            }
          }

          Session.set("updateForm", Router.current().location.get().path.split('/manage/')[1]);
              var section_bundles = sections;
              Forms.update(
                Session.get("updateForm"),
                {$set: 
                  {
                    section_bundles: section_bundles
                  }
                });
          var btn_counter = 0
          if(this.section_index == 0){
            btn_counter = this.qa_index;
          }else{
            for(i=0;i<this.section_index;i++){
              sections = Forms.findOne({_id: Router.current().location.get().path.split('/manage/')[1]}).section_bundles;
              btn_counter += sections[i].qa_bundle.length;
            }
            btn_counter += this.qa_index;
          }
          
          btn = $('.update-question')[btn_counter];
          $(btn).addClass('hide');
        },

        'click [name=edit_question]': function(e, templ){
          if($('.dragula')[this.section_index].getAttribute('class')!=='dragula edit-border'){
            var counter = 0
            if(this.section_index == 0){
              counter = this.qa_index;
            }else{
              for(i=0;i<this.section_index;i++){
                sections = Forms.findOne({_id: Router.current().location.get().path.split('/manage/')[1]}).section_bundles;
                for(j=0;j<sections[i].qa_bundle.length; j++){
                  counter += 1;
                }
              }
              counter += this.qa_index;
            }
            
            btn = $('.update-question')[counter];
            $(btn).removeClass('hide');
          }
        },

        'click [name=remove_int]': function(e, templ){
          var form = Forms.findOne({_id: Router.current().location.get().path.split('/manage/')[1]});
          interviewers = form.interviewers;
          interviewers.splice(this.int_index, 1);
          
          for(i=0;i<interviewers.length;i++){
            interviewers[i].int_index = i;
          }

          Session.set("updateForm", Router.current().location.get().path.split('/manage/')[1]);
              var interviewers = form.interviewers;
              Forms.update(
                Session.get("updateForm"),
                {$set: 
                  {
                    interviewers: interviewers
                  }
                });
        },

        'click [name=add_interviewer]': function(e, templ){
          var int_name = $('#interviewer')[0].value;
          var list = $('.interviewer-list')[0];
          $('#interviewer')[0].value = '';
          
          var form = Forms.findOne({_id: Router.current().location.get().path.split('/manage/')[1]});
          form.interviewers.push({name:int_name, int_index:form.interviewers.length});

          Session.set("updateForm", Router.current().location.get().path.split('/manage/')[1]);
              var interviewers = form.interviewers;
              Forms.update(
                Session.get("updateForm"),
                {$set: 
                  {
                    interviewers: interviewers
                  }
                });



        },

        'keypress #interviewer': function(e, tmpl){
          if(e.keyCode==13){
            $('.add-btn')[0].click();
          }
        }
  });

  Template.ManageForms.events({
    'click [name=submit_new]': function(e, tmpl){
      e.preventDefault();

      var position_name = $('#position-name')[0].value;
      d = new Date();
      Forms.insert({
        position_name: position_name,
        section_bundles: 
        [
          {
            section: 'Section 1', 
            section_index: 0, 
            qa_bundle:
              [
                {
                  section: 'Section 1', 
                  question: 'Sample question...', 
                  correct_answer: 'Sample answer...', 
                  qa_index: 0, 
                  section_index: 0,
                  difficulty: '',
                }
              ]
          }
        ],
        interviewers: [],
        created_at: d.toDateString()
      });

      Roles.insert({
        position_name: position_name,
        screen_bundle: [],
        created_at: d.toDateString()
      });

      form_id = Forms.findOne({position_name: position_name})._id;

      Dashboards.insert({
        position_name: position_name,
        form_id: form_id,
        created_at: d.toDateString()
      });

      $('#position-name')[0].value = '';
    },

    'click [name=edit]': function(e, tmpl) {
      e.preventDefault();

      window.location = '/manage/'+this._id;
    },

    'click [name=delete]': function(e, tmpl) {
      e.preventDefault();
      ask = confirm('Are you sure?');
      if(ask === true){
        Forms.remove(this._id);
        Roles.remove({_id: Roles.findOne({position_name: this.position_name})._id});
      }
    },

    'click [name=new-screen]': function(e, tmpl) {
      d = new Date();
      NewScreen.insert({
        first: '',
        role: this.position_name,
        answers: [],
        form_id: this._id,
        position_name: this.position_name,
        section_bundles: this.section_bundles,
        interviewers: this.interviewers,
        created_at: d.toDateString(),
        owner: Meteor.userId()
      });

      window.location= '/forms/'+NewScreen.find().fetch()[NewScreen.find().fetch().length-1]._id;
    },

    'keypress #position-name': function(e, tmpl){
      if(e.keyCode==13){
        $('#submit-new').click();
      }
    },

    'click [name=dash_link]': function(e, templ){
      window.location= '/dashboards/'+Dashboards.findOne({form_id: this._id})._id;
      console.log(this);
    }
  });


  Template.StoredScreen.events({
    'click [name=add_interview]': function(e, templ){
      newObj = {}
      newObj['stage'] = $('.stage')[0].value;
      newObj['interviewer'] = $('.interviewer')[0].value;
      newObj['rating'] = $('.rating')[0].value;
      newObj['confidence'] = $('.confidence')[0].value;
      newObj['int_date'] = $('.int-date')[0].value;
      newObj['int_index'] = this.interviews.length;
      console.log(this.interviews.length);

      current_interviews = this.interviews;

      current_interviews.push(newObj);

      Session.set("updateScreen", Router.current().location.get().path.split('/screens/')[1]);

      Screens.update(
        Session.get("updateScreen"),
        {$set: 
          {
            interviews: current_interviews
          }
        });
    },

    'click [name=offer_bool]': function(e, templ){
      if($('#offer-box')[0].checked){
        var new_bool_value = true;
      }else{
        var new_bool_value = false;
      }

      Session.set("updateScreen", Router.current().location.get().path.split('/screens/')[1]);

      Screens.update(
        Session.get("updateScreen"),
        {$set: 
          {
            offer_received: new_bool_value
          }
        });
    },

    'click [name=delete_int]': function(e, templ){
      interviews = Screens.findOne({_id: Router.current().location.get().path.split('/screens/')[1]}).interviews;
      interviews.splice(this.int_index,1);

      for(i=0;i<interviews.length;i++){
        interviews[i].int_index = i;
      }

      Session.set("updateScreen", Router.current().location.get().path.split('/screens/')[1]);

        Screens.update(
          Session.get("updateScreen"),
          {$set: 
            {
              interviews: interviews
            }
          });
    },

    'click [name="update_screen"]': function(e, tmpl){
      var name = $('#name-header')[0].value;
      var notes = $('#prescreen-notes-display')[0].value;
      var current_screen_id = Router.current().location.get().path.split('/screens/')[1];
      var current_screen = Screens.findOne({'_id': current_screen_id});

      Session.set("updateScreen", current_screen_id);

        Screens.update(
          Session.get("updateScreen"),
          {$set: 
            {
              prescreen_notes: notes,
              name: name
            }
          });

      var new_bundle = Roles.findOne({'position_name': current_screen.role}).screen_bundle;
      for(i=0;i<new_bundle.length;i++){
        if(new_bundle[i].screen_id == current_screen_id){
          new_bundle[i]['name'] = name
        }
      }

      Session.set("updateRole", Roles.findOne({'position_name': current_screen.role})._id);

      Roles.update(
        Session.get("updateRole"),
        {$set: 
          {
            screen_bundle: new_bundle
          }
        });
    }
  });

  Template.Dashboards.events({
    'click [name=init_dash]': function(e, templ){
      container = $('.stats-container')[this.q_id];
      $(container).toggleClass('hide');
    }
  });

  Template.Search.events({
    'keypress #search-name': function(e, tmpl){
      if(e.keyCode==13){
        $('#search-bttn').click();
      }
    },

    'click [name=delete]': function(e, tmpl) {
      e.preventDefault();
      ask = confirm('Are you sure?');
      if(ask === true){
        Screens.remove(this._id);

        var arr = Roles.findOne({position_name: this.role})['screen_bundle']

        new_bundle=[]

        for(i=0;i<arr.length;i++){
          if(arr[i].screen_id != this._id){
            new_bundle.push(arr[i]);
          }
        }
        console.log(new_bundle)

        Session.set("updateRole", Roles.findOne({position_name: this.role})._id);

          Roles.update(
            Session.get("updateRole"),
            {$set: 
              {
                screen_bundle: new_bundle
              }
            });
      }
    },

    'click [name=claim]': function(e, templ){
      Session.set("updateScreen", this._id);
        Screens.update(
          Session.get("updateScreen"),
          {$set: 
            {
              owner: Meteor.userId()
            }
          });
      console.log('this.role: '+this.role);
      temp_role = Roles.findOne({'position_name': this.role});
      console.log(temp_role);
      for(i=0;i<temp_role.screen_bundle.length;i++){
        if(temp_role.screen_bundle[i].screen_id == this._id){
          temp_role.screen_bundle[i]['owner'] = Meteor.userId()
        }
      }
      Session.set("updateRole", temp_role._id);
      Roles.update(
        Session.get("updateRole"),
        {$set: 
          {
            screen_bundle: temp_role.screen_bundle
          }
        });
      alert('You have claimed this screen!')
    },

    'click [name=search_bttn]': function(e, templ){
  
      var search_arr = Screens.find().fetch();
      name_box = $('#search-name')[0];
      owner_box = $('#search-owner')[0];
      role_box = $('#search-role')[0];

      name_bool = $(name_box).val() != false
      owner_bool = $(owner_box).val() != false
      role_bool = $(role_box).val() != false

      if(owner_bool == true){
        owner_id = Meteor.users.findOne({'profile.name': $(owner_box).val()})._id
      }

      function search_screens(name, owner, role){
        bin = [+name, +owner, +role]
        bin_str = bin[0].toString() + bin[1].toString() + bin[2].toString() 
        bin_int = parseInt(bin_str, 2)

        if(bin_int == 1){
          search_arr = Screens.find({'role':$(role_box).val()}).fetch()
        }
        if(bin_int == 2){
          search_arr = Screens.find({'owner': owner_id}).fetch()
        }
        if(bin_int == 3){
          search_arr = Screens.find({'owner': owner_id, 'role':$(role_box).val()}).fetch()
        }
        if(bin_int == 4){
          var regex = new RegExp($(name_box).val(),'i');
          search_arr = Screens.find({'name':regex}).fetch()
        }
        if(bin_int == 5){
          var regex = new RegExp($(name_box).val(),'i');
          search_arr = Screens.find({'name':regex, 'role':$(role_box).val()}).fetch()
        }
        if(bin_int == 6){
          var regex = new RegExp($(name_box).val(),'i');
          search_arr = Screens.find({'name':regex, 'owner':owner_id}).fetch()
        }
        if(bin_int == 7){
          var regex = new RegExp($(name_box).val(),'i');
          search_arr = Screens.find({'name':regex, 'owner':owner_id, 'role':$(role_box).val()}).fetch()
        }
      }

      search_screens(name_bool,owner_bool,role_bool);

      if(search_arr.length == 0){
        nope = $('#no-results')[0];
        $(nope).show();

        setTimeout(function() { $(nope).fadeOut(500); }, 3000);
      }

      var tbl_txt = '<th class="result-table-header">Name</th><th class="result-table-header">Role</th><th class="result-table-header">Date Screened</th><th class="result-table-header">Link</th><th class="result-table-header">Owner</th><th class="result-table-header"></th>';

      for(i=0;i<search_arr.length;i++){
        console.log(tbl_txt);
        tbl_txt = tbl_txt+'<tr class="result-row" id="'+search_arr[i]._id+'"><td class="result-name">'+search_arr[i].name+'</td><td class="result-role">'+search_arr[i].role+'</td><td>'+search_arr[i].created_at+'</td><td><a href="/screens/'+search_arr[i]._id+'" target="blank" class="search-link"> http://prn-prescrns01.thefacebook.com/screens/'+search_arr[i]._id+'</a></td><td>'+search_arr[i].owner+'</td><td><button type="button" name="delete">delete</button><button type="button" name="claim">claim</button></td></tr>'
      }

      $(".table.results-table")[0].innerHTML = tbl_txt
    }
  });

  function init_dash(){
    dashboard = Dashboards.findOne({_id: Router.current().location.get().path.split('/dashboards/')[1]});
      form = Forms.findOne({_id: dashboard.form_id});
      unique_q = [];
      screens = Screens.find().fetch();
      for(i=0;i<screens.length;i++){
        if(screens[i].role == form.position_name){
          for(j=0;j<screens[i].section_bundles.length;j++){
            for(k=0;k<screens[i].section_bundles[j].qa_bundle.length;k++){
              
              if($.inArray(screens[i].section_bundles[j].qa_bundle[k].question, unique_q)<0){
                unique_q.push(screens[i].section_bundles[j].qa_bundle[k].question);
              }
            }
          }
        }
      }

      q_ids = [];
      for(i=0;i<unique_q.length;i++){
        q_ids.push(i);
      }

      var times_asked = [];
      var correct = [];
      var incorrect = [];
      var correct_candidates = [];
      var incorrect_candidates = [];
      var correct_offers = [];
      var incorrect_offers = [];
      for(i=0;i<unique_q.length;i++){
        counter=0;
        right=0;
        wrong=0;
        c_offer_counter = 0;
        i_offer_counter = 0;
        corr_off_test_arr = []
        inc_off_test_arr = []
        for(j=0;j<screens.length;j++){
          if(screens[j].role == form.position_name){
            for(k=0;k<screens[j].section_bundles.length;k++){
              for(l=0;l<screens[j].section_bundles[k].qa_bundle.length;l++){
                if(screens[j].section_bundles[k].qa_bundle[l].question == unique_q[i]){
                  counter += 1;
                  if(screens[j].section_bundles[k].qa_bundle[l].correctness == 'correct'){
                    right += 1;
                    correct_candidates.push({
                      screen_id: screens[j]._id,
                      question: unique_q[i]
                    });
                    if(corr_off_test_arr.indexOf(correct_candidates[correct_candidates.length-1].screen_id) == -1){
                      corr_off_test_arr.push(correct_candidates[correct_candidates.length-1].screen_id)
                      if(Screens.findOne({_id: correct_candidates[correct_candidates.length-1].screen_id}).offer_received == true){
                        c_offer_counter += 1;
                      }
                    }
                  }else if(screens[j].section_bundles[k].qa_bundle[l].correctness == 'incorrect'){
                    wrong += 1;
                    incorrect_candidates.push({
                      screen_id: screens[j]._id,
                      question: unique_q[i]
                    });
                    if(inc_off_test_arr.indexOf(incorrect_candidates[incorrect_candidates.length-1].screen_id) == -1){
                      inc_off_test_arr.push(incorrect_candidates[incorrect_candidates.length-1].screen_id)
                      if(Screens.findOne({_id: incorrect_candidates[incorrect_candidates.length-1].screen_id}).offer_received == true){
                        i_offer_counter += 1;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        times_asked.push(counter);
        correct.push(right);
        incorrect.push(wrong);
        correct_offers.push(c_offer_counter);
        incorrect_offers.push(i_offer_counter);
      }

      doc_arr=[];
      for(i=0;i<unique_q.length;i++){
        corr_pre_pass = 0;
        corr_pre_fail = 0;
        corr_i_pass = 0;
        corr_i_fail = 0;
        corr_fu_pass = 0;
        corr_fu_fail = 0;
        corr_sys_pass = 0;
        corr_sys_fail = 0;
        corr_net_pass = 0;
        corr_net_fail = 0;
        corr_pir_pass = 0;
        corr_pir_fail = 0;
        corr_nin_pass = 0;
        corr_nin_fail = 0;
        corr_jedi_pass = 0;
        corr_jedi_fail = 0;
        inc_pre_pass = 0;
        inc_pre_fail = 0;
        inc_i_pass = 0;
        inc_i_fail = 0;
        inc_fu_pass = 0;
        inc_fu_fail = 0;
        inc_sys_pass = 0;
        inc_sys_fail = 0;
        inc_net_pass = 0;
        inc_net_fail = 0;
        inc_pir_pass = 0;
        inc_pir_fail = 0;
        inc_nin_pass = 0;
        inc_nin_fail = 0;
        inc_jedi_pass = 0;
        inc_jedi_fail = 0;

        for(j=0;j<correct_candidates.length;j++){
          if(correct_candidates[j].question == unique_q[i]){
            current_screen = Screens.findOne({_id: correct_candidates[j].screen_id});
            for(k=0;k<current_screen.interviews.length;k++){
              if(current_screen.interviews[k].stage == 'Prescreen'){
                if(current_screen.interviews[k].rating == 'Recommend Follow Up' || current_screen.interviews[k].rating == 'Recommend Onsite'){
                  corr_pre_pass += 1;
                }else if(current_screen.interviews[k].rating == 'Reject' || current_screen.interviews[k].rating == 'No Hire'){
                  corr_pre_fail += 1;
                }else if(current_screen.interviews[k].rating == 'Hire'){
                  corr_pre_pass += 1;
                }
              }else if(current_screen.interviews[k].stage == 'Initial'){
                if(current_screen.interviews[k].rating == 'Recommend Follow Up' || current_screen.interviews[k].rating == 'Recommend Onsite'){
                  corr_i_pass += 1;
                }else if(current_screen.interviews[k].rating == 'Reject' || current_screen.interviews[k].rating == 'No Hire'){
                  corr_i_fail += 1;
                }
              }else if(current_screen.interviews[k].stage == 'Follow Up'){
                if(current_screen.interviews[k].rating == 'Recommend Follow Up' || current_screen.interviews[k].rating == 'Recommend Onsite'){
                  corr_fu_pass += 1;
                }else if(current_screen.interviews[k].rating == 'Reject' || current_screen.interviews[k].rating == 'No Hire'){
                  corr_fu_fail += 1;
                }
              }else if(current_screen.interviews[k].stage == 'Onsite - Pirate'){
                if(current_screen.interviews[k].rating == 'Hire'){
                  corr_pir_pass += 1;
                }else if(current_screen.interviews[k].rating == 'No Hire' || current_screen.interviews[k].rating == 'Reject'){
                  corr_pir_fail += 1;
                }
              }else if(current_screen.interviews[k].stage == 'Onsite - Systems'){
                if(current_screen.interviews[k].rating == 'Hire'){
                  corr_sys_pass += 1;
                }else if(current_screen.interviews[k].rating == 'No Hire' || current_screen.interviews[k].rating == 'Reject'){
                  corr_sys_fail += 1;
                }
              }else if(current_screen.interviews[k].stage == 'Onsite - Network'){
                if(current_screen.interviews[k].rating == 'Hire'){
                  corr_net_pass += 1;
                }else if(current_screen.interviews[k].rating == 'No Hire' || current_screen.interviews[k].rating == 'Reject'){
                  corr_net_fail += 1;
                }
              }else if(current_screen.interviews[k].stage == 'Onsite - Ninja'){
                if(current_screen.interviews[k].rating == 'Hire'){
                  corr_nin_pass += 1;
                }else if(current_screen.interviews[k].rating == 'No Hire' || current_screen.interviews[k].rating == 'Reject'){
                  corr_nin_fail += 1;
                }
              }else if(current_screen.interviews[k].stage == 'Onsite - Jedi'){
                if(current_screen.interviews[k].rating == 'Hire'){
                  corr_jedi_pass += 1;
                }else if(current_screen.interviews[k].rating == 'No Hire' || current_screen.interviews[k].rating == 'Reject'){
                  corr_jedi_fail += 1;
                }
              }
            }
          }
        }

        for(j=0;j<incorrect_candidates.length;j++){
          if(incorrect_candidates[j].question == unique_q[i]){
            current_screen = Screens.findOne({_id: incorrect_candidates[j].screen_id});
            for(k=0;k<current_screen.interviews.length;k++){
              if(current_screen.interviews[k].stage == 'Prescreen'){
                if(current_screen.interviews[k].rating == 'Recommend Follow Up' || current_screen.interviews[k].rating == 'Recommend Onsite'){
                  inc_pre_pass += 1;
                }else if(current_screen.interviews[k].rating == 'Reject' || current_screen.interviews[k].rating == 'No Hire'){
                  inc_pre_fail += 1;
                }else if(current_screen.interviews[k].rating == 'Hire'){
                  inc_pre_pass += 1;
                }
              }else if(current_screen.interviews[k].stage == 'Initial'){
                if(current_screen.interviews[k].rating == 'Recommend Follow Up' || current_screen.interviews[k].rating == 'Recommend Onsite'){
                  inc_i_pass += 1;
                }else if(current_screen.interviews[k].rating == 'Reject' || current_screen.interviews[k].rating == 'No Hire'){
                  inc_i_fail += 1;
                }
              }else if(current_screen.interviews[k].stage == 'Follow Up'){
                if(current_screen.interviews[k].rating == 'Recommend Follow Up' || current_screen.interviews[k].rating == 'Recommend Onsite'){
                  inc_fu_pass += 1;
                }else if(current_screen.interviews[k].rating == 'Reject' || current_screen.interviews[k].rating == 'No Hire'){
                  inc_fu_fail += 1;
                }
              }else if(current_screen.interviews[k].stage == 'Onsite - Pirate'){
                if(current_screen.interviews[k].rating == 'Hire'){
                  inc_pir_pass += 1;
                }else if(current_screen.interviews[k].rating == 'No Hire' || current_screen.interviews[k].rating == 'Reject'){
                  inc_pir_fail += 1;
                }
              }else if(current_screen.interviews[k].stage == 'Onsite - Systems'){
                if(current_screen.interviews[k].rating == 'Hire'){
                  inc_sys_pass += 1;
                }else if(current_screen.interviews[k].rating == 'No Hire' || current_screen.interviews[k].rating == 'Reject'){
                  inc_sys_fail += 1;
                }
              }else if(current_screen.interviews[k].stage == 'Onsite - Network'){
                if(current_screen.interviews[k].rating == 'Hire'){
                  inc_net_pass += 1;
                }else if(current_screen.interviews[k].rating == 'No Hire' || current_screen.interviews[k].rating == 'Reject'){
                  inc_net_fail += 1;
                }
              }else if(current_screen.interviews[k].stage == 'Onsite - Ninja'){
                if(current_screen.interviews[k].rating == 'Hire'){
                  inc_nin_pass += 1;
                }else if(current_screen.interviews[k].rating == 'No Hire' || current_screen.interviews[k].rating == 'Reject'){
                  inc_nin_fail += 1;
                }
              }else if(current_screen.interviews[k].stage == 'Onsite - Jedi'){
                if(current_screen.interviews[k].rating == 'Hire'){
                  inc_jedi_pass += 1;
                }else if(current_screen.interviews[k].rating == 'No Hire' || current_screen.interviews[k].rating == 'Reject'){
                  inc_jedi_fail += 1;
                }
              }
            }
          }
        }

        doc_arr.push({
          question: unique_q[i],
          corr_pre_pass : corr_pre_pass,
          corr_pre_fail : corr_pre_fail,
          corr_i_pass : corr_i_pass,
          corr_i_fail : corr_i_fail,
          corr_fu_pass : corr_fu_pass,
          corr_fu_fail : corr_fu_fail,
          corr_sys_pass : corr_sys_pass,
          corr_sys_fail : corr_sys_fail,
          corr_net_pass : corr_net_pass,
          corr_net_fail : corr_net_fail,
          corr_pir_pass : corr_pir_pass,
          corr_pir_fail : corr_pir_fail,
          corr_nin_pass : corr_nin_pass,
          corr_nin_fail : corr_nin_fail,
          corr_jedi_pass : corr_jedi_pass,
          corr_jedi_fail : corr_jedi_fail,
          inc_pre_pass : inc_pre_pass,
          inc_pre_fail : inc_pre_fail,
          inc_i_pass : inc_i_pass,
          inc_i_fail : inc_i_fail,
          inc_fu_pass : inc_fu_pass,
          inc_fu_fail : inc_fu_fail,
          inc_sys_pass : inc_sys_pass,
          inc_sys_fail : inc_sys_fail,
          inc_net_pass : inc_net_pass,
          inc_net_fail : inc_net_fail,
          inc_pir_pass : inc_pir_pass,
          inc_pir_fail : inc_pir_fail,
          inc_nin_pass : inc_nin_pass,
          inc_nin_fail : inc_nin_fail,
          inc_jedi_pass : inc_jedi_pass,
          inc_jedi_fail : inc_jedi_fail
        });
      }
      
      var stats = [];
      for(i=0;i<unique_q.length;i++){
        my_obj={};
        my_obj['question'] = unique_q[i];
        my_obj['times_asked'] = times_asked[i];
        my_obj['right'] = correct[i];
        my_obj['wrong'] = incorrect[i];
        my_obj['int_stats'] = [doc_arr[i]];
        my_obj['q_id'] = q_ids[i];
        my_obj['correct_offers'] = correct_offers[i];
        my_obj['incorrect_offers'] = incorrect_offers[i];
        stats.push(my_obj);
      }

      Session.set("updateDashboard", Router.current().location.get().path.split('/dashboards/')[1]);
        Dashboards.update(
          Session.get("updateDashboard"),
          {$set: 
            {
              stats: stats
            }
          });

      stat_keys = [['corr_pre_pass', 'right'],['corr_i_pass', 'right'], ['corr_fu_pass', 'right'],'corr_net_pass', 'corr_sys_pass', 'corr_nin_pass', 'corr_pir_pass', 'corr_jedi_pass', ['corr_pre_fail', 'right'], ['corr_i_fail', 'right'], ['corr_fu_fail', 'right'],'corr_net_fail', 'corr_sys_fail', 'corr_nin_fail', 'corr_pir_fail', 'corr_jedi_fail', ['inc_pre_pass', 'wrong'], ['inc_i_pass', 'wrong'],['inc_fu_pass', 'wrong'],'inc_net_pass', 'inc_sys_pass', 'inc_nin_pass', 'inc_pir_pass', 'inc_jedi_pass', ['inc_pre_fail', 'wrong'], ['inc_i_fail', 'wrong'], ['inc_fu_fail', 'wrong'],'inc_net_fail', 'inc_sys_fail', 'inc_nin_fail', 'inc_pir_fail', 'inc_jedi_fail']
      
      
      for(i=0;i<dashboard.stats.length;i++){
        onsite_total = 0;
        dash_screens = Screens.find({role: Dashboards.findOne({_id: Router.current().location.get().path.split('/dashboards/')[1]}).position_name}).fetch();
        for(k=0;k<dash_screens.length;k++){
          dash_screen = dash_screens[k];
          for(l=0;l<dash_screen.interviews.length;l++){
            if(dash_screen.interviews[l].stage.indexOf("Onsite")>-1){
              onsite_total += 1;
              break;
            }
          }
        }
        for(j=0;j<stat_keys.length;j++){
          if(dashboard.stats[i].right == 0 && dashboard.stats[i].wrong == 0){
            $('td')[(i*32)+j].innerHTML = '0.00%';
          }else if(dashboard.stats[i].right == 0 && j<16){
            $('td')[(i*32)+j].innerHTML = '0.00%';
          }else if(dashboard.stats[i].wrong == 0 && j>=16){
            $('td')[(i*32)+j].innerHTML = '0.00%';
          }else if(j==0){
            total_pre = dashboard.stats[i].int_stats[0][stat_keys[0][0]]+dashboard.stats[i].int_stats[0][stat_keys[8][0]]
            if(total_pre == 0){
              num = 0;
            }else{
              num = (parseFloat(dashboard.stats[i].int_stats[0][stat_keys[0][0]]/total_pre) *100.00); 
            }
            $('td')[(i*32)+j].innerHTML = num.toFixed(2) + "%";
          }else if(j==1){
            total_initial = dashboard.stats[i].int_stats[0][stat_keys[1][0]]+dashboard.stats[i].int_stats[0][stat_keys[9][0]]
            if(total_initial == 0){
              num = 0;
            }else{
              num = (parseFloat(dashboard.stats[i].int_stats[0][stat_keys[1][0]]/total_initial) *100.00); 
            }
            $('td')[(i*32)+j].innerHTML = num.toFixed(2) + "%";
          }else if(j==2){
            total_fu = dashboard.stats[i].int_stats[0][stat_keys[2][0]]+dashboard.stats[i].int_stats[0][stat_keys[10][0]]
            if(total_initial == 0){
              num = 0;
            }else{
              num = (parseFloat(dashboard.stats[i].int_stats[0][stat_keys[2][0]]/total_fu) *100.00); 
            }
            $('td')[(i*32)+j].innerHTML = num.toFixed(2) + "%";
          }else if(j==8){
            if(total_pre == 0){
              num = 0;
            }else{
              num = (parseFloat(dashboard.stats[i].int_stats[0][stat_keys[8][0]]/total_pre) *100.00);
            }
            $('td')[(i*32)+j].innerHTML = num.toFixed(2) + "%";
          }else if(j==9){ //you're here
            if(total_initial == 0){
              num = 0;
            }else{
              num = (parseFloat(dashboard.stats[i].int_stats[0][stat_keys[9][0]]/total_initial) *100.00);
            }
            $('td')[(i*32)+j].innerHTML = num.toFixed(2) + "%";
          }else if(j==10){
            if(total_fu == 0){
              num = 0;
            }else{
              num = (parseFloat(dashboard.stats[i].int_stats[0][stat_keys[10][0]]/total_fu) *100.00);
            }
            $('td')[(i*32)+j].innerHTML = num.toFixed(2) + "%";
          }else if(j==16){
            total_pre = dashboard.stats[i].int_stats[0][stat_keys[16][0]]+dashboard.stats[i].int_stats[0][stat_keys[24][0]]
            if(total_pre == 0){
              num = 0;
            }else{
              num = (parseFloat(dashboard.stats[i].int_stats[0][stat_keys[16][0]]/total_pre) *100.00);
            }
            $('td')[(i*32)+j].innerHTML = num.toFixed(2) + "%";
          }else if(j==17){ //you're here
            total_initial = dashboard.stats[i].int_stats[0][stat_keys[17][0]]+dashboard.stats[i].int_stats[0][stat_keys[25][0]]
            if(total_initial == 0){
              num = 0;
            }else{
              num = (parseFloat(dashboard.stats[i].int_stats[0][stat_keys[17][0]]/total_initial) *100.00);
            }
            $('td')[(i*32)+j].innerHTML = num.toFixed(2) + "%";
          }else if(j==18){
            total_fu = dashboard.stats[i].int_stats[0][stat_keys[18][0]]+dashboard.stats[i].int_stats[0][stat_keys[26][0]]
            if(total_fu == 0){
              num = 0;
            }else{
              num = (parseFloat(dashboard.stats[i].int_stats[0][stat_keys[18][0]]/total_fu) *100.00);
            }
            $('td')[(i*32)+j].innerHTML = num.toFixed(2) + "%";
          }else if(j==24){
            if(total_pre == 0){
              num = 0;
            }else{
              num = (parseFloat(dashboard.stats[i].int_stats[0][stat_keys[24][0]]/total_pre) *100.00);
            }
            $('td')[(i*32)+j].innerHTML = num.toFixed(2) + "%";
          }else if(j==25){
            if(total_initial == 0){
              num = 0;
            }else{
              num = (parseFloat(dashboard.stats[i].int_stats[0][stat_keys[25][0]]/total_initial) *100.00);
            }
            $('td')[(i*32)+j].innerHTML = num.toFixed(2) + "%";
          }else if(j==26){
            if(total_fu == 0){
              num = 0;
            }else{
              num = (parseFloat(dashboard.stats[i].int_stats[0][stat_keys[26][0]]/total_fu) *100.00);
            }
            $('td')[(i*32)+j].innerHTML = num.toFixed(2) + "%";
          }else{
            if(onsite_total == 0){
              num = 0;
              $('td')[(i*32)+j].innerHTML = num.toFixed(2) + "%";
            }else{
              num = (parseFloat(dashboard.stats[i].int_stats['0'][stat_keys[j]]/onsite_total) *100.00);
              $('td')[(i*32)+j].innerHTML = num.toFixed(2) + "%";
            }
          }
        }
      }

      function corr_chart(int_stats, chrt_id){
        var options = {
          animation : false
        }
        var data = {
          labels: ["Onsite - Network", "Onsite - Systems", "Onsite - Ninja", "Onsite - Pirate", "Onsite - Jedi"],
          datasets: [
              {
                  label: "Pass",
                  fillColor: "rgba(21, 192, 21,0.5)",
                  strokeColor: "rgba(220,220,220,0.8)",
                  highlightFill: "rgba(21, 192, 21,0.8)",
                  highlightStroke: "rgba(220,220,220,1)",
                  data: 
                    [ 
                      int_stats.corr_net_pass,
                      int_stats.corr_sys_pass, 
                      int_stats.corr_nin_pass, 
                      int_stats.corr_pir_pass, 
                      int_stats.corr_jedi_pass
                    ]
              },
              {
                  label: "Fail",
                  fillColor: "rgba(233, 21, 21,0.5)",
                  strokeColor: "rgba(151,187,205,0.8)",
                  highlightFill: "rgba(233, 21, 21,0.8)",
                  highlightStroke: "rgba(151,187,205,1)",
                  data: 
                    [ 
                      int_stats.corr_net_fail,
                      int_stats.corr_sys_fail, 
                      int_stats.corr_nin_fail, 
                      int_stats.corr_pir_fail,  
                      int_stats.corr_jedi_fail
                    ]
              }
          ]
        };

        var ctx = $("#"+chrt_id).get(0).getContext("2d");

        var myBarChart = new Chart(ctx).Bar(data, options);
      }

      function incorr_chart(int_stats, chrt_id){

        var options = {
          animation : false
        }

        var data = {
          labels: ["Onsite - Network", "Onsite - Systems", "Onsite - Ninja", "Onsite - Pirate", "Onsite - Jedi"],
          datasets: [
              {
                  label: "Pass",
                  fillColor: "rgba(21, 192, 21,0.5)",
                  strokeColor: "rgba(220,220,220,0.8)",
                  highlightFill: "rgba(21, 192, 21,0.8)",
                  highlightStroke: "rgba(220,220,220,1)",
                  data: 
                    [ 
                      int_stats.inc_net_pass,
                      int_stats.inc_sys_pass, 
                      int_stats.inc_nin_pass, 
                      int_stats.inc_pir_pass, 
                      int_stats.inc_jedi_pass
                    ]
              },
              {
                  label: "Fail",
                  fillColor: "rgba(233, 21, 21,0.5)",
                  strokeColor: "rgba(151,187,205,0.8)",
                  highlightFill: "rgba(233, 21, 21,0.8)",
                  highlightStroke: "rgba(151,187,205,1)",
                  data: 
                    [ 
                      int_stats.inc_net_fail,
                      int_stats.inc_sys_fail, 
                      int_stats.inc_nin_fail, 
                      int_stats.inc_pir_fail, 
                      int_stats.inc_jedi_fail
                    ]
              }
          ]
        };

        var ctx = $("#"+chrt_id).get(0).getContext("2d");

        var myBarChart = new Chart(ctx).Bar(data, options);
      }

      questions = Dashboards.findOne({_id: window.location.pathname.split('/dashboards/')[1]}).stats; 
      for(i=0;i<questions.length;i++){
        chrt_id1 = 'a'+i;
        chrt_id2 = 'b'+i;
        int_stats = Dashboards.findOne({_id: window.location.pathname.split('/dashboards/')[1]}).stats[i].int_stats[0];
        corr_chart(int_stats, chrt_id1);
        incorr_chart(int_stats, chrt_id2);
      }
      $('#loading')[0].innerHTML = '';
    }
  }

if (Meteor.isServer) {

  Meteor.publish("allUsers", function() {
    return Meteor.users.find();
  });

  Meteor.publish("roles", function () {
    return Roles.find();
  });

  Meteor.publish("forms", function () {
    return Forms.find();
  });

  Meteor.publish('screens', function(){
      return Screens.find();
  });

  Meteor.publish("newscreen", function () {
    return NewScreen.find();
  });

  Meteor.publish("sections", function () {
    return Sections.find();
  });

  Meteor.publish("dashboards", function () {
    return Dashboards.find();
  });
  
}
  