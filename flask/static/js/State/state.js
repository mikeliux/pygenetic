$(document).ready(function() {
	// console.log(UploadState.handleFileSelect);
    // Button events initialize
    var crossover_func_cnt = 0
    var mutation_func_cnt = 0
    var $form = $('#main_form')
    $("#run").attr("disabled", true);
    $("#download_code").attr("disabled", true);
    function download(filename, text) 
    {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        pom.setAttribute('download', filename);

        if (document.createEvent) {
          var event = document.createEvent('MouseEvents');
          event.initEvent('click', true, true);
          pom.dispatchEvent(event);
      }
      else {
            pom.click();
        }
    }


    function polling(event,form,generationNumber)
    {
        var MAX_ITER = parseInt(document.getElementById('no-of-evolutions').value)
        console.log(generationNumber);
        var best_fitness;
        if(generationNumber > MAX_ITER)
        {
            console.log('HERE');
            var date = new Date();
            var timestamp = date.getTime();
            $('#results').append('<br/><h3> GA Statistics </h3><br/>')
            document.getElementById('fitness_graph_image').src = '/plot_fitness_graph?lastmod='+ timestamp;
            return;
        }
        else if(generationNumber == 1)
        {
                $('#results').empty();
                document.getElementById("fitness_graph_image").src= ''; 
                $.ajax(
                    {
                        type: "POST",
                        url: '/ga_init',
                        async: false,
                        data: form.serialize(),
                        success: function(data) 
                        {
                            
                            var fitness_response = data['Best-Fitnesses'];
                            best_fitness = fitness_response[0][1];
                            var str = `<div class='col-xl-12 col-lg-12 col-md-12 col-12 noPadColumn' id='funcDeclWrapper'> 
                                        <div class='container-fluid'> 
                                            <div class='row'> 
                                                <div class='col-xl-12 col-lg-12 col-md-12 col-12' id='stepsRowInfo'> 
                                                    Generation ` + generationNumber + ` 
                                                </div> 
                                            </div> 
                                            <hr class='fancyHorLine1'> 
                                            <div class='row' id='targetFuncDeclWrapperRow'> 
                                                <div class='col-xl-12 col-lg-12 col-md-12 col-12'> 
                                                    <div class='container-fluid'> 
                                                        <div class='row'> 
                                                            <div class='col-xl-6 col-lg-6 col-md-6 col-6'> 
                                                                <span class='monkeyPatchShiftToRight'> Chromosome </span> 
                                                            </div> 
                                                            <div class='col-xl-6 col-lg-6 col-md-6 col-6'> 
                                                                <span class='monkeyPatchShiftToRight'> Fitness </span> 
                                                            </div> 
                                                        </div> 
                                                        <div class='row' id='targetFuncDeclDivRow'> 
                                                            <div class='col-xl-12 col-lg-12 col-md-12 col-12 customBorder funcToDelete noPadColumn'> 
                                                                <div class='container-fluid repeatableTargetFuncDeclList'> 
                                                                    <div class='row'>
                                                                         <div class='col-xl-6 col-lg-6 col-md-6 col-6'> 
                                                                            ` + fitness_response[0][0]+ ` 
                                                                        </div> 
                                                                        <div class='col-xl-6 col-lg-6 col-md-6 col-6'> ` +  
                                                                            fitness_response[0][1] + ` 
                                                                        </div> 
                                                                    </div> 
                                                                    <div class='row'>
                                                                        <div class='col-xl-6 col-lg-6 col-md-6 col-6'> 
                                                                            ` + fitness_response[1][0]+ ` 
                                                                        </div> 
                                                                        <div class='col-xl-6 col-lg-6 col-md-6 col-6'> ` +  
                                                                            fitness_response[1][1] + ` 
                                                                        </div> 
                                                                    </div>
                                                                    <div class='row'>
                                                                        <div class='col-xl-6 col-lg-6 col-md-6 col-6'> 
                                                                            ` + fitness_response[2][0]+ ` 
                                                                        </div> 
                                                                        <div class='col-xl-6 col-lg-6 col-md-6 col-6'> ` +  
                                                                            fitness_response[2][1] + ` 
                                                                        </div> 
                                                                    </div>
                                                                    <div class='row'>
                                                                        <div class='col-xl-6 col-lg-6 col-md-6 col-6'> 
                                                                            ` + fitness_response[3][0]+ ` 
                                                                        </div> 
                                                                        <div class='col-xl-6 col-lg-6 col-md-6 col-6'> ` +  
                                                                            fitness_response[3][1] + ` 
                                                                        </div> 
                                                                    </div>
                                                                    <div class='row'>
                                                                        <div class='col-xl-6 col-lg-6 col-md-6 col-6'> 
                                                                            ` + fitness_response[4][0]+ ` 
                                                                        </div> 
                                                                        <div class='col-xl-6 col-lg-6 col-md-6 col-6'> ` +  
                                                                            fitness_response[4][1] + ` 
                                                                        </div> 
                                                                    </div> 
                                                                </div> 
                                                            </div> 
                                                        </div> 
                                                  </div> 
                                              </div> 
                                           </div> 
                                        </div> 
                                    </div>`;
                            
                            $('#results').append('<br/><br/><h3> GA Results (Best 5 Chromosomes) </h3><br/>')
                            $('#results').append(str); 
                            $('html, body').animate({scrollTop:$(document).height()}, 'fast');
                    }
                });
        }
        else
        {
                    console.log('here11');
                    $.ajax({
                    type: "GET",
                    async: false,
                    url: '/ga_evolve',
                    success: function(data) 
                    {
                        
                        
                        var fitness_response = data['Best-Fitnesses'];
                        best_fitness = fitness_response[0][1];
                        var str = `<div class='col-xl-12 col-lg-12 col-md-12 col-12 noPadColumn' id='funcDeclWrapper'> 
                            <div class='container-fluid'> 
                                <div class='row'> 
                                    <div class='col-xl-12 col-lg-12 col-md-12 col-12' id='stepsRowInfo'> 
                                        Generation ` + generationNumber + `
                                    </div> 
                                </div> 
                                <hr class='fancyHorLine1'> 
                                <div class='row' id='targetFuncDeclWrapperRow'> 
                                    <div class='col-xl-12 col-lg-12 col-md-12 col-12'> 
                                        <div class='container-fluid'> 
                                            <div class='row'> 
                                                <div class='col-xl-6 col-lg-6 col-md-6 col-6'> 
                                                    <span class='monkeyPatchShiftToRight'> Chromosome </span> 
                                                </div> 
                                                <div class='col-xl-6 col-lg-6 col-md-6 col-6'> 
                                                    <span class='monkeyPatchShiftToRight'> Fitness </span> 
                                                </div> 
                                            </div> 
                                            <div class='row' id='targetFuncDeclDivRow'> 
                                                <div class='col-xl-12 col-lg-12 col-md-12 col-12 customBorder funcToDelete noPadColumn'> 
                                                    <div class='container-fluid repeatableTargetFuncDeclList'> 
                                                        <div class='row'>
                                                            <div class='col-xl-6 col-lg-6 col-md-6 col-6'> 
                                                                ` + fitness_response[0][0]+ ` 
                                                            </div> 
                                                            <div class='col-xl-6 col-lg-6 col-md-6 col-6'> ` +  
                                                                fitness_response[0][1] + ` 
                                                            </div> 
                                                        </div> 
                                                        <div class='row'>
                                                            <div class='col-xl-6 col-lg-6 col-md-6 col-6'> 
                                                                ` + fitness_response[1][0]+ ` 
                                                            </div> 
                                                            <div class='col-xl-6 col-lg-6 col-md-6 col-6'> ` +  
                                                                fitness_response[1][1] + ` 
                                                            </div> 
                                                        </div>
                                                        <div class='row'>
                                                            <div class='col-xl-6 col-lg-6 col-md-6 col-6'> 
                                                                ` + fitness_response[2][0]+ ` 
                                                            </div> 
                                                            <div class='col-xl-6 col-lg-6 col-md-6 col-6'> ` +  
                                                                fitness_response[2][1] + ` 
                                                            </div> 
                                                        </div>
                                                        <div class='row'>
                                                            <div class='col-xl-6 col-lg-6 col-md-6 col-6'> 
                                                                ` + fitness_response[3][0]+ ` 
                                                            </div> 
                                                            <div class='col-xl-6 col-lg-6 col-md-6 col-6'> ` +  
                                                                fitness_response[3][1] + ` 
                                                            </div> 
                                                        </div>
                                                        <div class='row'>
                                                            <div class='col-xl-6 col-lg-6 col-md-6 col-6'> 
                                                                ` + fitness_response[4][0]+ ` 
                                                            </div> 
                                                            <div class='col-xl-6 col-lg-6 col-md-6 col-6'> ` +  
                                                                fitness_response[4][1] + ` 
                                                            </div> 
                                                        </div>    
                                                    </div> 
                                                </div> 
                                            </div> 
                                      </div> 
                                  </div> 
                               </div> 
                            </div> 
                        </div>`;
               
                $('#results').append(str); 
                $('html, body').animate({scrollTop:$(document).height()}, 'fast');
            }
            });
        }
        if(document.getElementById('fitness-achieve-select').value == 'equal')
        {
            if(best_fitness == parseInt(document.getElementById('fitness-achive-value').value))
            {
                var date = new Date();
                var timestamp = date.getTime();
                document.getElementById('fitness_graph_image').src = '/plot_fitness_graph?lastmod='+ timestamp;
                console.log('pewdiepie');
                return;
            }
        }
        //$("html, body").animate({ scrollTop: $(document).height() }, "slow");
        setTimeout(polling,0,event,form,generationNumber+1);
    }

    $('#download_code').click(function() {
        button_pressed = 'download_code';
    });

    $('#run').click(function() {
        button_pressed = 'run';
    });

    $form.submit(function(e) 
    {
        e.preventDefault();
        var form = $(this);
        console.log(button_pressed);
        console.log('here1');
        if(button_pressed=='run')
        {
            console.log('here2');
            polling(e,form,1);
            return false;
        }
        else
        {
            console.log('here3');
            $.ajax({
                    type: "POST",
                    async: false,
                    url: '/commonCodeCreate',
                    data: form.serialize(),
                    success: function(data){
                        console.log(data);
                        download('ga.py', data);
                    }
            });
            console.log('here4');
            return false;
        }
        console.log('here5');
        
    });

	UploadState.receivedText = UploadState.receivedText.bind(UploadState)
	UploadState.receivedText = function() {
		var data = (JSON.parse(self.fr.result));
		if(!Upload.validateJSON("state", data)) {
			return;
		}
		console.log(data);
		
		// For States
		data['states'].forEach(function(state, i) {
			jQuery("#stateListColDiv > div:nth-child("+(i+1)+") > div > button.btn.btn-outline-secondary.addStateBtn").first().trigger("click");
			jQuery("#stateListColDiv > div:nth-child("+(i+1)+") > input").val(state.name);
			console.log(state.name);
		});
		// Remove Extra
		jQuery("#stateListColDiv > div:last-child > div > button.btn.btn-outline-secondary.delStateBtn").first().trigger("click");
		
		data['functions'].forEach(function(functions, i) {
			jQuery("#funcDeclDivRow > div:nth-child("+(i+1)+") > div > div > div:nth-child(4) > div > div > button.btn.btn-secondary.addFuncDeclBtn").first().trigger("click")
			jQuery("#funcDeclDivRow > div:nth-child("+(i+1)+") > div > div > div:nth-child(1) > input").val(functions.name)
			jQuery("#funcDeclDivRow > div:nth-child("+(i+1)+") > div > div > div:nth-child(2) > input").val(functions.return)
			
			functions.param_types.forEach(function(param_type, j) {
				jQuery("#funcDeclDivRow > div:nth-child("+(i+1)+") > div > div > div.col-xl-6.col-lg-6.col-md-6.col-6.paramDiv > div:nth-child("+(j+1)+") > div > button.btn.btn-outline-secondary.addParameterBtn").first().trigger("click")
				jQuery("#funcDeclDivRow > div:nth-child("+(i+1)+") > div > div > div.col-xl-6.col-lg-6.col-md-6.col-6.paramDiv > div:nth-child("+(j+1)+") > input.form-control.validName.paramType").val(param_type)
				console.log(param_type)
			});
			jQuery("#funcDeclDivRow > div:nth-child("+(i+1)+") > div > div > div.col-xl-6.col-lg-6.col-md-6.col-6.paramDiv > div:last-child > div > button.btn.btn-outline-secondary.delParameterBtn").first().trigger("click")
			
			functions.param_names.forEach(function(param_name, j) {
				jQuery("#funcDeclDivRow > div:nth-child("+(i+1)+") > div > div > div.col-xl-6.col-lg-6.col-md-6.col-6.paramDiv > div:nth-child("+(j+1)+") > input.form-control.validName.paramName").val(param_name)
			});
		});	
		
		jQuery("#funcDeclDivRow > div:last-child > div > div > div:nth-child(4) > div > div > button.btn.btn-danger.delFuncDeclBtn").first().trigger("click")

		Upload.validate();
	}
	UploadState.handleFileSelect = UploadState.handleFileSelect.bind(UploadState)
	$("#fileinput").change(UploadState.handleFileSelect);
	
    // START: Add a state functionality.
    $("#crossoverListColDiv").on("click", ".addStateBtn", function(event) {
        $("#delCrossover"+crossover_func_cnt.toString()).attr("disabled", true);
        crossover_func_cnt += 1
        console.log("add clicked",$(this));
        $("#crossoverListColDiv").append('  <div class="row" id="crossover'+crossover_func_cnt.toString()+'">\
        <div class="col-xl-2 col-lg-2 col-md-2 col-2">\
            <div class="input-group repeatableStateListGroup">\
                <select class="form-control crossover-type" id="crossover-select'+crossover_func_cnt.toString()+'" onchange="placeCrossoverTextArea(this)" name="crossover-type'+crossover_func_cnt.toString()+'"> \
                    <option value="distinct"> distinct </option>\
                    <option value="onePoint"> onePoint </option>\
                    <option value="twoPoint"> twoPoint </option>\
                    <option value="PMX"> PMX </option>\
                    <option value="OX"> OX </option>\
                    <option value="custom"> Custom </option>\
                </select>\
            </div>\
        </div>\
        <div class="col-xl-2 col-lg-2 col-md-2 col-2">\
            <input type="text" class="form-control validName funcName crossoverWeight" placeholder="Weight" aria-label="Function Name" aria-describedby="basic-addon4" tabindex="0" data-toggle="popover" data-trigger="manual" data-placement="top" data-content="Invalid Name" id="fitness-achive-value" name="crossover-weight'+crossover_func_cnt.toString()+'">\
        </div>\
        <div class="col-xl-2 col-lg-2 col-md-2 col-2">\
            <div class="input-group-append">\
                <button class="btn btn-outline-secondary addStateBtn" type="button" data-toggle="tooltip" data-placement="top" title="Add another state">+</button>\
                <button class="btn btn-outline-secondary delStateBtn" type="button" data-toggle="tooltip" data-placement="top" title="Delete this state" id="delCrossover'+crossover_func_cnt.toString()+'">-</button>\
            </div>\
        </div>\
        <div class="container-fluid" id="crossover-code'+crossover_func_cnt.toString()+'" style="display:none;">\
            <div class="row" id="targetFuncDeclWrapperRow">\
                <div class="col-xl-12 col-lg-12 col-md-12 col-12">\
                    <div class="container-fluid">\
                        <div class="row">\
                            <div class="col-xl-2 col-lg-2 col-md-2 col-2">\
                                <span class="monkeyPatchShiftToRight"> Crossover function code </span>\
                            </div>\
                        </div>\
                        <div class="row" id="targetFuncDeclDivRow">\
                            <div class="col-xl-12 col-lg-12 col-md-12 col-12 customBorder funcToDelete noPadColumn">\
                                <div class="container-fluid repeatableTargetFuncDeclList">\
                                    <div class="row">\
                                        <div class="col-xl-8 col-lg-8 col-md-8 col-8">\
                                            <textarea class="form-control" cols="1000" rows="5" name="custom-crossover'+crossover_func_cnt.toString()+'">#Enter crossover func here</textarea>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
        ');
    });
    
    $("#mutationListColDiv").on("click", ".addStateBtn", function(event) {
        $("#delMutation"+mutation_func_cnt.toString()).attr("disabled", true);
        mutation_func_cnt += 1
        console.log("add clicked",$(this));
        $("#mutationListColDiv").append('  <div class="row">\
        <div class="col-xl-2 col-lg-2 col-md-2 col-2">\
            <div class="input-group repeatableStateListGroup">\
                <select class="form-control mutation-type" id="mutation-select'+mutation_func_cnt.toString()+'" onchange="placeMutationTextArea(this)" name="mutation-type'+mutation_func_cnt.toString()+'"> \
                    <option value="swap"> swap </option>\
                    <option value="bitFlip"> bitFlip </option>\
                    <option value="custom"> Custom </option>\
                </select>\
            </div>\
        </div>\
        <div class="col-xl-2 col-lg-2 col-md-2 col-2">\
            <input type="text" class="form-control validName funcName mutationWeight" placeholder="Weight" aria-label="Function Name" aria-describedby="basic-addon4" tabindex="0" data-toggle="popover" data-trigger="manual" data-placement="top" data-content="Invalid Name" id="fitness-achive-value" name="mutation-weight'+mutation_func_cnt.toString()+'">\
        </div>\
        <div class="col-xl-2 col-lg-2 col-md-2 col-2">\
            <div class="input-group-append">\
                <button class="btn btn-outline-secondary addStateBtn" type="button" data-toggle="tooltip" data-placement="top" title="Add another state">+</button>\
                <button class="btn btn-outline-secondary delStateBtn" type="button" data-toggle="tooltip" data-placement="top" title="Delete this state" id="delMutation'+mutation_func_cnt.toString()+'">-</button>\
            </div>\
        </div>\
        <div class="container-fluid" id="mutation-code'+mutation_func_cnt.toString()+'" style="display:none;">\
            <div class="row" id="targetFuncDeclWrapperRow">\
                <div class="col-xl-12 col-lg-12 col-md-12 col-12">\
                    <div class="container-fluid">\
                        <div class="row">\
                            <div class="col-xl-2 col-lg-2 col-md-2 col-2">\
                                <span class="monkeyPatchShiftToRight"> Mutation function code </span>\
                            </div>\
                        </div>\
                        <div class="row" id="targetFuncDeclDivRow">\
                            <div class="col-xl-12 col-lg-12 col-md-12 col-12 customBorder funcToDelete noPadColumn">\
                                <div class="container-fluid repeatableTargetFuncDeclList">\
                                    <div class="row">\
                                        <div class="col-xl-8 col-lg-8 col-md-8 col-8">\
                                            <textarea class="form-control" cols="1000" rows="5" name="custom-mutation'+mutation_func_cnt.toString()+'">#Enter mutation func here</textarea>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
        ');
    });
    
    
    // END: Add a state functionality.

    // START: Delete a state functionality.
    $("#crossoverListColDiv").on("click", ".delStateBtn", function(event) {
        console.log("del clicked",$(this));
        var eleToBeDeleted = $(this).closest(".row");
        console.log("parents = ",$(this).parents)
        console.log("elem to be deleted = ",eleToBeDeleted);
        eleToBeDeleted.remove();
        crossover_func_cnt-=1
        $("#delCrossover"+crossover_func_cnt.toString()).attr("disabled", false);
    });
    $("#mutationListColDiv").on("click", ".delStateBtn", function(event) {
        console.log("del clicked",$(this));
        var eleToBeDeleted = $(this).closest(".row");
        console.log("parents = ",$(this).parents)
        console.log("elem to be deleted = ",eleToBeDeleted);
        eleToBeDeleted.remove();
        mutation_func_cnt-=1
        $("#delMutation"+mutation_func_cnt.toString()).attr("disabled", false);
    });
    // END: Delete a state functionality.

    // START: Add a paramter functionality.
    $("#funcDeclWrapperRow").on('click', '.addParameterBtn', function(event) {
        console.log("addParameterTypeBtn");
        var eleToBeAddedTo = $(this).parents(".paramDiv");
        eleToBeAddedTo.append("\
            <div class='input-group repeatableParamListGroup'>\
                <input type='text' class='form-control validName paramType' placeholder='Parameter Type' aria-label='Parameter Type' aria-describedby='basic-addon2'\
                             tabindex='0' data-toggle='popover' data-trigger='manual' data-placement='left' data-content='Invalid Name'>\
                <input type='text' class='form-control validName paramName' placeholder='Parameter Name' aria-label='Parameter Name' aria-describedby='basic-addon2'\
                             tabindex='0' data-toggle='popover' data-trigger='manual' data-placement='left' data-content='Invalid Name'>\
                <div class='input-group-append'>\
                    <button class='btn btn-outline-secondary addParameterBtn' type='button' data-toggle='tooltip' data-placement='top' title='Add another parameter'>+</button>\
                    <button class='btn btn-outline-secondary delParameterBtn' type='button' data-toggle='tooltip' data-placement='top' title='Delete this parameter'>-</button>\
                </div>\
            </div>\
        ");
    });
    // END: Add a paramter functionality.

    // START: Delete a paramter functionality.
    $("#funcDeclWrapperRow").on('click', '.delParameterBtn', function(event) {
        console.log("delParameterTypeBtn");
        var eleToBeDeleted = $(this).parents(".repeatableParamListGroup");
        console.log(eleToBeDeleted);
        eleToBeDeleted.remove();        
    });
    // END: Delete a paramter functionality.

    // START: Add a function declaration functionality.
    $("#funcDeclWrapperRow").on('click', '.addFuncDeclBtn', function(event) {
        console.log("addParameterTypeBtn");
        $("#funcDeclDivRow").append("\
            <div class='col-xl-12 col-lg-12 col-md-12 col-12 customBorder funcToDelete noPadColumn'>\
                <div class='container-fluid repeatableFuncDeclList'>\
                    <div class='row'>\
                        <div class='col-xl-2 col-lg-2 col-md-2 col-2'>\
                            <input type='text' class='form-control validName retTypeName' placeholder='Return Type' aria-label='Return Type' aria-describedby='basic-addon3'\
                             tabindex='0' data-toggle='popover' data-trigger='manual' data-placement='left' data-content='Invalid Name'>\
                        </div>\
                        <div class='col-xl-2 col-lg-2 col-md-2 col-2'>\
                            <input type='text' class='form-control validName funcName' placeholder='Function Name' aria-label='Function Name' aria-describedby='basic-addon4'\
                             tabindex='0' data-toggle='popover' data-trigger='manual' data-placement='right' data-content='Invalid Name'>\
                        </div>\
                        <div class='col-xl-6 col-lg-6 col-md-6 col-6 paramDiv'>\
                            <div class='input-group repeatableParamListGroup'>\
                                <input type='text' class='form-control validName paramType' placeholder='Parameter Type' aria-label='Parameter Type' aria-describedby='basic-addon2'\
                             tabindex='0' data-toggle='popover' data-trigger='manual' data-placement='left' data-content='Invalid Name'>\
                                <input type='text' class='form-control validName paramName' placeholder='Parameter Name' aria-label='Parameter Name' aria-describedby='basic-addon2'\
                             tabindex='0' data-toggle='popover' data-trigger='manual' data-placement='left' data-content='Invalid Name'>\
                                <div class='input-group-append'>\
                                    <button class='btn btn-outline-secondary addParameterBtn' type='button' data-toggle='tooltip' data-placement='top' title='Add another parameter'>+</button>\
                                    <button class='btn btn-outline-secondary delParameterBtn' type='button' data-toggle='tooltip' data-placement='top' title='Delete this parameter' style='pointer-events: none;' >-</button>\
                                </div>\
                            </div>\
                        </div>\
                        <div class='col-xl-2 col-lg-2 col-md-2 col-2'>\
                            <div class='btn-toolbar' role='toolbar' aria-label='Toolbar with button groups'>\
                                <div class='btn-group mr-2' role='group' aria-label='First group'>\
                                    <button class='btn btn-secondary addFuncDeclBtn' type='button' data-toggle='tooltip' data-placement='top' title='Add another function'>Add</button>\
                                    <button class='btn btn-danger delFuncDeclBtn' type='button' data-toggle='tooltip' data-placement='top' title='Delete this function'>Remove</button>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        ");
    });
    // END: Add a function declaration functionality.

    // START: Delete a function functionality.
    $("#funcDeclWrapperRow").on('click', '.delFuncDeclBtn', function(event) {
        console.log("delParameterTypeBtn");
        var eleToBeDeleted = $(this).parents(".funcToDelete");
        console.log(eleToBeDeleted);
        eleToBeDeleted.remove();        
    });    
    // END: Delete a function functionality.
    
    // START: Cosmetic change to display file type selected in the dropdown.
    $(".fileType").on('click', function(event) {
        $("#fileTypeBtn").text($(this).text());
    });
    // END: Cosmetic change to display file type selected in the dropdown.

    // START : Code Download Functionality (includes form submission without forms per se)

    var errorNumber = 0;
    $("#codeDownload").on('click', function(event) {
        
        // 0. The JSON required by render.py is mentioned
        // 1. Get all variable values
        // 2. Organise them in the inputData JS Object
        // 3. Send a POST to necessary URL
        // 4. Get back file.

        // Step 0: The JSON required by render.py is mentioned
        // {
        //     'pattern': 'state',
        //     'states':[
        //         {'name': 'S1'},
        //         {'name': 'S2'},
        //         {'name': 'S3'}
        //     ],
        //     'functions':[
        //         {
        //             'name': 'f1', 
        //             'param_types':['int', 'float'], 
        //             'param_names':['i1', 'f1'], 
        //             'return': 'void'
        //         },
        //         {
        //             'name': 'f2',
        //             'param_types':['int', 'double'],
        //             'param_names':['i2', 'd2'],
        //             'return': 'double'
        //         }
        //     ]
        // }
        var errorCheckAttributes={
            isErraneousForm:false
        };

        function checkPopover(fn) {
            function inner(scope,type) {
                var ele = scope.find(type);
                if(ele.attr('isValidInput')=="true"){
                    return fn(ele);
                }
                else{
                    errorCheckAttributes["isErraneousForm"] = true;
                    ele.popover('show');
                }
            }
            return inner
        };


        // Step 1: Get All variables

        function getParamTypesList(scope) {
            var paramTypeList = [];
            var curParamTypeChildren = scope.find('.paramType');
            curParamTypeChildren.each(function(index, el) {
                if($(this).attr('isValidInput')=="true"){
                    paramTypeList.push($(this).val());
                }
                else{
                    errorCheckAttributes["isErraneousForm"] = true;
                    $(this).popover('show');
                }
            });
            return paramTypeList;
        }
        
        function getParamNamesList(scope) {
            var paramNameList = [];
            var curParamNameChildren = scope.find('.paramName');
            curParamNameChildren.each(function(index, el) {
                if($(this).attr('isValidInput')=="true"){
                    paramNameList.push($(this).val());
                }
                else{
                    errorCheckAttributes["isErraneousForm"] = true;
                    $(this).popover('show');
                }
            });
            return paramNameList;
        }

        function getFuncName(ele,type) {
            return ele.val();
        }

        function getFuncRetType(ele,type) {
            return ele.val();
        }

        function getStatesList(){
            var statesList = [];
            $(".stateName").each(function(index, el) {
                if($(this).attr('isValidInput')=="true"){
                    statesList.push({
                        "name":$(this).val()
                    });
                }
                else{
                    errorCheckAttributes["isErraneousForm"] = true;
                    $(this).popover('show');
                }
            });
            return statesList;
        }

        function getFunctionDeclList() {
            // repeatableFuncDeclList
            var functionsList = [];
            $(".repeatableFuncDeclList").each(function(index, el) {
                functionsList.push({
                    "name":getFuncName($(this),".funcName"),
                    "param_types":getParamTypesList($(this)),
                    "param_names":getParamNamesList($(this)),
                    "return":getFuncRetType($(this),".retTypeName")
                });
            });
            return functionsList;
        }

        getFuncName = checkPopover(getFuncName);
        getFuncRetType = checkPopover(getFuncRetType);

        var inpData = {
            "pattern":"state",
            "states":getStatesList(),
            "functions":getFunctionDeclList(),
            "fileType":$("#fileTypeBtn").text(), //this key will be removed in backend.
        }
        console.log("inpData:",inpData)
        if(!errorCheckAttributes["isErraneousForm"]){
            // do AJAX POST and send it away
            console.log(inpData);

            $.ajax({
                url: "commonCodeCreate",
                type: "POST",
                dataType: "JSON",
                data: JSON.stringify(inpData),
                contentType:"application/json; charset=UTF-8"
            })
            .done(function(info) {
                console.log("success");
                console.log("success info:",info);
                if(info["success"]==true)
                {
                    $("#downloadCodeForm").submit(); //download the code. AJAX can't download by itself
                }
            })
            .fail(function(info) {
                console.log("error");
                console.log("error info:",info);
            })
            .always(function() {
                console.log("complete");
                console.log("complete info:",$(this));
            });
            
        }
        else{
            if(errorNumber<2){
                $("#errorModal").on('show.bs.modal', function(event) {
                    $("#errorModalBody").text("Check and correct the inputs which are being pointed to.Whenever you are ready, click Download again.");
                });
                $("#errorModal").modal("toggle");
            }
            else if(errorNumber<4){
                $("#errorModal").on('show.bs.modal', function(event) {
                    $("#errorModalBody").text("Correct the inputs which are being pointed to.");
                });
                $("#errorModal").modal("toggle");
            }
            else{
                $("#errorModal").on('show.bs.modal', function(event) {
                    $("#errorModalBody").text("Ok now, read the entries and enter properly.");
                });
                $("#errorModal").modal("toggle");
            }
            errorNumber++;
            console.log(errorNumber);
        }
    });

    // END : Code Download Functionality (includes form submission without forms per se)
    
    // START : State input validation
    /*
    function matchExact(r, str) {
       var match = str.match(r);
       return match != null && str == match[0];
    }
    */

    function isPositiveNumber(inputValue){
        if(!(isNaN(inputValue))){
            return (inputValue > 0);
        }
        
        else{return false;}
    }
    

    $(".entireStateWrapper").on("focus",".validName", function(event) {
        $(this).popover("hide");
    });

    $(".entireStateWrapper").on("input",".validName", function(event) {
        var res;
        
        if($(this).hasClass("noOfGenes") || $(this).hasClass("rangeFactoryInput") || 
            $(this).hasClass("fitnessValue") || $(this).hasClass("crossoverWeight") || $(this).hasClass("mutationWeight") ||
            $(this).hasClass("noOfEvolutions"))
            {
             res = isPositiveNumber($(this).val());
        }

        
        if($(this).hasClass("rangeFactoryMinInput") || $(this).hasClass("rangeFactoryMaxInput")){
            if(!(isNaN($(this).val()))){
                res = true;
            }
            else{
                res = false;
            }
        }

        /*
        if($(this).hasClass("regexInput")){

            var regex = new RegExp([0-9]);
            var charRegex = new  RegExp([a-zA-Z])
            if(($(this).val()).test(regex) || ($(this).val()).test(charRegex)){
                res = true;
            }
            else{res = false;}
        }
        */

        if($(this).hasClass("populationSize")){
            if(!(isNaN($(this).val())) && $(this).val() >= 5){
                res = true;
            }
            else{res = false;}

        }
        
        if($(this).hasClass("crossoverRate") || $(this).hasClass("mutationRate")){
            if(!(isNaN($(this).val())) && !(isNaN($(this).val())) && $(this).val() > 0 && $(this).val() < 1){
                res = true;
            }
            else{res = false;}
        }



        if(res==false){
            console.log("here");
            $(this).attr("isValidInput",false);
            $(this).css('color', 'red');
            
        }
        else{
            $(this).attr("isValidInput",true);
            $(this).css('color', 'green');
          
        }
    });

    $(".entireStateWrapper").on("focus",".validName", function(event) {
        if($(this).attr("isValidInput") == "true"){
            $(this).css('color', 'green');
        }
        else
        {
            $(this).css('color', 'red');
        }
    });

    $(".entireStateWrapper").on("blur",".validName", function(event) {
        if($(this).attr("isValidInput") == "true"){
            $(this).css('color', 'black');
        }
    });
    var wto;
    // Disabling / enabling submit
    $("input, select").change(function(){
        allValid = true;
        var inputs = $(".validName");
        var factory = $("#gene-generation").val();
        console.log(factory);
        if(factory == '1drange')
        {
            if($('#range-factory-min-value').val()=='' || $('#range-factory-min-value').css("color") == 'rgb(255, 0, 0)')
                allValid = false
            if($('#range-factory-max-value').val()=='' || $('#range-factory-max-value').css("color") == 'rgb(255, 0, 0)')
                allValid = false
        }
        else if(factory == '1dregex')
        {
            console.log($('#regexInput').val());
            if($('#regexInput').val()=='' || $('#regexInput').css("color") == 'rgb(255, 0, 0)')
                allValid = false
        }
        var fitness_type = $('#fitness-achieve-select');
        if( fitness_type.val() == 'equal')
        {
            if($('#fitness-achive-value').val()=='' || $('#fitness-achive-value').val() != parseInt($('#fitness-achive-value').val()))
                allValid = false
        }
        var selection_type = $('#selection-select');
        if( selection_type.val() == 'tournament')
        {
            if($('#tournsize').val()=='' || $('#tournsize').val() != parseInt($('#tournsize').val()))
                allValid = false
        }
        console.log(allValid);

        for(var i = 0; i < inputs.length ; i++){
            console.log($(inputs[i]).css("color"));
            if( $(inputs[i]).val()=='' || $(inputs[i]).css("color") == 'rgb(255, 0, 0)'){
                allValid  = false;
                console.log(inputs[i]);
            }
        }
        console.log(allValid);
        if(allValid){
            $("#run").attr("disabled",false);
            $("#download_code").attr("disabled", false);
        }
        else
        {
            $("#run").attr("disabled",true);
            $("#download_code").attr("disabled", true);
        }

    });
    // END : State name validation

});