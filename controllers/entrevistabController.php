<?php

class entrevistabController extends Controller
{

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		if (isset($_SESSION['usuario'])) {

			$this->_view->conctructor_menu('control','entrevistab');

			$this->_view->setCss_Specific(
				array(
					'dist/css/fontawesome/css/all',
					'dist/css/vendors.min',
					'dist/css/calendars/main',
					'dist/css/calendars/theme-chooser',
					// 'dist/css/extensions/toastr.min',
					// 'dist/css/forms/bs-stepper.min',
					'plugins/vendors/css/extensions/sweetalert2.min',
					'dist/css/forms/select/select2.min',
					'dist/css/bootstrap',
					'dist/css/bootstrap-extended',
					'dist/css/colors',
					'dist/css/components',
					'dist/css/core/menu/menu-types/vertical-menu',
					'dist/css/plugins/forms/form-validation',
					'dist/css/pages/app-calendar',
					'dist/css/plugins/forms/form-wizard',
					// 'dist/css/plugins/extensions/ext-component-toastr',
					'dist/css/custom',
					'dist/css/style',
					'plugins/vendors/css/extensions/ext-component-sweet-alerts',
					// 'plugins/vendors/css/pickers/flatpickr/flatpickr.min',
					//data tables
					'plugins/datatables-net/css/jquery.dataTables.min',
					//'plugins/datatables-net/css/searchPanes.dataTables.min',
					//'plugins/datatables-net/select.dataTables.min',
					'plugins/datatables-net/css/buttons.dataTables.min',
					'plugins/datatables-net/css/responsive.dataTables.min',
					'plugins/datatables-net/css/dataTables.checkboxes'
				)
			);

			$this->_view->setJs_Specific(
				array(
					'plugins/vendors/js/vendors.min',
					'plugins/vendors/js/calendar/main',
					'plugins/vendors/js/calendar/locales-all',
					'plugins/vendors/js/extensions/toastr.min',
					// 'plugins/vendors/js/forms/wizard/bs-stepper.min',
					'plugins/vendors/js/forms/select/select2.full.min',
					'plugins/vendors/js/forms/validation/jquery.validate.min',
					'dist/js/core/app-menu',
					'dist/js/core/app',
					'dist/js/scripts/forms/form-wizard',
					//data tables
					'plugins/datatables-net/js/jquery.dataTables.min',
					//'plugins/datatables-net/js/dataTables.searchPanes.min',
					'plugins/datatables-net/js/dataTables.select.min',
					'plugins/datatables-net/js/dataTables.buttons.min',
					'plugins/datatables-net/js/buttons.flash.min',
					'plugins/datatables-net/js/jszip.min',
					'plugins/datatables-net/js/pdfmake.min',
					'plugins/datatables-net/js/vfs_fonts',
					'plugins/datatables-net/js/buttons.html5.min',
					'plugins/datatables-net/js/buttons.print.min',
					'plugins/datatables-net/js/dataTables.responsive.min',
					'plugins/datatables-net/js/dataTables.checkboxes.min',
					'plugins/vendors/js/extensions/sweetalert2.all.min',

					'plugins/vendors/js/pickers/flatpickr/flatpickr.min',
					// 'dist/js/scripts/pages/app-calendar-events',
					// 'dist/js/scripts/pages/app-calendar',
				)
			);

			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);
			$soap = new SoapClient($wsdl, $options);

			$result = $soap->EntrevistaB();
			$entrevista = json_decode($result->EntrevistaBResult, true);

			$this->_view->entrevista = $entrevista;

			$this->_view->setJs(array('index'));
			$this->_view->renderizar('index');
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function estrevista_detalle() //cargar index para detalle por publicaciones
	{
		if (isset($_SESSION['usuario'])) {

			$this->_view->conctructor_menu('control','entrevistab');

			$this->_view->setCss_Specific(
				array(
					'dist/css/fontawesome/css/all',
					'dist/css/vendors.min',
					//
					'plugins/vendors/css/pickers/pickadate/pickadate',
					// 'plugins/vendors/css/pickers/flatpickr/flatpickr.min',
					'plugins/vendors/css/pickers/flatpickr/material_green',

					'dist/css/calendars/main',
					'dist/css/calendars/theme-chooser',
					'dist/css/pages/app-calendar',
					// 'dist/css/extensions/toastr.min',
					// 'dist/css/forms/bs-stepper.min',
					'plugins/vendors/css/extensions/sweetalert2.min',
					'dist/css/forms/select/select2.min',
					'dist/css/bootstrap',
					'dist/css/bootstrap-extended',
					'dist/css/colors',
					'dist/css/components',
					'dist/css/core/menu/menu-types/vertical-menu',
					'dist/css/plugins/forms/form-validation',
					'dist/css/plugins/forms/form-wizard',
					// 'dist/css/plugins/extensions/ext-component-toastr',
					'dist/css/custom',
					'dist/css/style',
					'plugins/vendors/css/extensions/ext-component-sweet-alerts',
					//data tables
					'plugins/datatables-net/css/jquery.dataTables.min',
					//'plugins/datatables-net/css/searchPanes.dataTables.min',
					//'plugins/datatables-net/select.dataTables.min',
					// 'plugins/datatables-net/css/buttons.dataTables.min',
					'plugins/datatables-net/css/responsive.dataTables.min',
					'plugins/datatables-net/css/dataTables.checkboxes',
					//
					'plugins/vendors/css/pickers/form-flat-pickr',
					'plugins/vendors/css/pickers/form-pickadate',
				)
			);

			$this->_view->setJs_Specific(
				array(
					'plugins/vendors/js/vendors.min',
					'plugins/vendors/js/calendar/main',
					'plugins/vendors/js/calendar/locales-all',
					'plugins/vendors/js/extensions/toastr.min',
					// 'plugins/vendors/js/forms/wizard/bs-stepper.min',
					'plugins/vendors/js/forms/select/select2.full.min',
					'plugins/vendors/js/forms/validation/jquery.validate.min',
					'dist/js/core/app-menu',
					'dist/js/core/app',
					'dist/js/scripts/forms/form-wizard',
					//data tables
					'plugins/datatables-net/js/jquery.dataTables.min',
					//'plugins/datatables-net/js/dataTables.searchPanes.min',
					'plugins/datatables-net/js/dataTables.select.min',
					'plugins/datatables-net/js/dataTables.buttons.min',
					'plugins/datatables-net/js/buttons.flash.min',
					// 'plugins/datatables-net/js/jszip.min',
					// 'plugins/datatables-net/js/pdfmake.min',
					// 'plugins/datatables-net/js/vfs_fonts',
					// 'plugins/datatables-net/js/buttons.html5.min',
					// 'plugins/datatables-net/js/buttons.print.min',
					'plugins/datatables-net/js/dataTables.responsive.min',
					'plugins/datatables-net/js/dataTables.checkboxes.min',
					'plugins/vendors/js/extensions/sweetalert2.all.min',
					//
					'plugins/vendors/js/pickers/pickadate/picker',
					'plugins/vendors/js/pickers/pickadate/picker.date',
					'plugins/vendors/js/pickers/pickadate/picker.time',
					'plugins/vendors/js/pickers/pickadate/legacy',
					'plugins/vendors/js/pickers/flatpickr/flatpickr.min',
					// 'plugins/vendors/js/pickers/flatpickr/main',
					'dist/js/scripts/forms/pickers/form-pickers',
					// imput mask
					'dist/js/scripts/forms/form-input-mask',
					'plugins/vendors/js/forms/cleave/cleave.min',
					// 'dist/js/scripts/pages/app-calendar-events',
					// 'dist/js/scripts/pages/app-calendar',
					// 'dist/js/scripts/components/components-popovers',
				)
			);

			$publicacion = $_GET['publicacion'];
			$puesto = $_GET['puesto'];

			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);
			$soap = new SoapClient($wsdl, $options);

			$param = array(
				"post"			=> 1, //1 para listar detalle de postulación
				"id"			=> 0, //0 no busca
				"publicacion" 	=> $publicacion, //vacío sin publicacion, se lista de manera masiva
				"estados"		=> 0, //0 no se busca estado
			);

			$result = $soap->EntrevistaBDetalle($param);
			$entrevistadetalle = json_decode($result->EntrevistaBDetalleResult, true);

			$param1 = array(
				"post"		=> 2, //2 consulta todo para grilla
			);

			$result1 = $soap->CalendarioCategoria($param1);
			$calendariocat = json_decode($result1->CalendarioCategoriaResult, true);

			if (count($entrevistadetalle) > 0){
				$this->_view->puesto = $entrevistadetalle[0]['v_titulo2'];
			}else{
				$this->_view->puesto = $puesto;
			}
			
			$this->_view->calendariocat = $calendariocat;
			$this->_view->entrevistadetalle = $entrevistadetalle;

			$this->_view->setJs(array('entrevista'));
			$this->_view->renderizar('entrevista');

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function fpersonal() 
	{

		if (isset($_SESSION['usuario'])) {

			$codcargo = $_GET['codcargo']; //codigo del cargo 'JSI'
			$moncargo = $_GET['moncargo']; //nombre del cargo 'JEFE DE SISTEMAS'
			$publicacion = $_GET['publicacion']; //codigo de publicacion PUB000001
			$postulante = $_GET['postulante']; //id del postulante, id del reg_postulacion
			$secure = $_GET['secure'];	// codigo en binario MD5

			// $codcargo = 'JSI'; //codigo del cargo 'JSI'
			// $moncargo = 'JEFE DE SISTEMAS'; //nombre del cargo 'JEFE DE SISTEMAS'
			// $publicacion = 'PUB000001'; //codigo de publicacion PUB000001
			// $postulante = 1; //id del postulante, id del reg_postulacion
			// $secure = '464908378ece3ac77346f0b141318137';	// codigo en binario MD5

			$this->_view->setCss_Specific(
				array(
					'dist/css/vendors.min',
					'dist/css/fontawesome/css/all',
					// 'dist/css/extensions/toastr.min',
					'dist/css/forms/wizard/bs-stepper.min',
					'plugins/vendors/css/extensions/sweetalert2.min',
					'dist/css/forms/select/select2.min',
					'dist/css/bootstrap',
					'dist/css/bootstrap-extended',
					'dist/css/colors',
					'dist/css/components',
					'dist/css/core/menu/menu-types/vertical-menu',
					'dist/css/plugins/forms/form-validation',
					'dist/css/plugins/forms/form-wizard',
					// 'dist/css/plugins/extensions/ext-component-toastr',
					'dist/css/custom',
					'dist/css/style',
					'dist/css/plugins/forms/wizard/form-wizard',
					'plugins/vendors/css/extensions/ext-component-sweet-alerts',
					//data tables
					'plugins/datatables-net/css/jquery.dataTables.min',
					// 'plugins/datatables-net/css/searchPanes.dataTables.min',
					// 'plugins/datatables-net/select.dataTables.min',
					// 'plugins/datatables-net/css/buttons.dataTables.min',
					'plugins/datatables-net/css/responsive.dataTables.min',
					//
					'plugins/vendors/css/pickers/pickadate/pickadate',
					'plugins/vendors/css/pickers/flatpickr/flatpickr.min',
					'plugins/vendors/css/pickers/form-flat-pickr',
					'plugins/vendors/css/pickers/form-pickadate',
				)
			);
	
			$this->_view->setJs_Specific(
				array(
					'plugins/vendors/js/vendors.min',
					'plugins/vendors/js/extensions/toastr.min',
					'plugins/vendors/js/forms/wizard/bs-stepper.min',
					'plugins/vendors/js/forms/select/select2.full.min',
					'plugins/vendors/js/forms/validation/jquery.validate.min',
					'dist/js/core/app-menu',
					'dist/js/core/app',
					'dist/js/scripts/forms/form-wizard',
					//data tables
					'plugins/datatables-net/js/jquery.dataTables.min',
					// 'plugins/datatables-net/js/dataTables.searchPanes.min',
					// 'plugins/datatables-net/js/dataTables.select.min',
					// 'plugins/datatables-net/js/dataTables.buttons.min',
					// 'plugins/datatables-net/js/buttons.flash.min',
					// 'plugins/datatables-net/js/jszip.min',
					// 'plugins/datatables-net/js/pdfmake.min',
					// 'plugins/datatables-net/js/vfs_fonts',
					// 'plugins/datatables-net/js/buttons.html5.min',
					// 'plugins/datatables-net/js/buttons.print.min',
					'plugins/datatables-net/js/dataTables.responsive.min',
					//
					'plugins/vendors/js/extensions/sweetalert2.all.min',

					'plugins/vendors/js/pickers/pickadate/picker',
					'plugins/vendors/js/pickers/pickadate/picker.date',
					'plugins/vendors/js/pickers/pickadate/picker.time',
					'plugins/vendors/js/pickers/pickadate/legacy',
					'plugins/vendors/js/pickers/flatpickr/flatpickr.min',
					'dist/js/scripts/forms/pickers/form-pickers',
					// imput mask
					'dist/js/scripts/forms/form-input-mask',
					'plugins/vendors/js/forms/cleave/cleave.min',
				)
			);

			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);
			
			$soap = new SoapClient($wsdl, $options);

			$param = array(
				"publicacion"	=> $publicacion,
				"postulante"	=> $postulante,
				"secure" 		=> $secure,
			);

			$res = $soap->ConsultaRegFinalista($param);
			$regfinalista = json_decode($res->ConsultaRegFinalistaResult, true);

			if ($regfinalista[0]['i_count'] > 0){

				$refpuesto="<option value=".$codcargo.">(".$codcargo.") ".$moncargo."</option>";

				$result = $soap->PaTipoDocumento();
				$patipodoc = json_decode($result->PaTipoDocumentoResult, true);
	
				$combotipodoc="";
				foreach($patipodoc as $pa){
					$combotipodoc.="<option ".$pa['v_default']." value=".$pa['i_codigo'].">".$pa['v_descripcion']."</option>";
				}
	
				$result1 = $soap->PaCivil();
				$pacivil = json_decode($result1->PaCivilResult, true);
	
				$combocivil="";
				foreach($pacivil as $pa){
					$combocivil.="<option ".$pa['v_default']." value=".$pa['i_codigo'].">".$pa['v_descripcion']."</option>";
				}
	
				$result2 = $soap->Pais();
				$pais = json_decode($result2->PaisResult, true);
	
				$combopais="";
				foreach($pais as $pa){
					$combopais.="<option ".$pa['v_default']." value=".$pa['i_codigo'].">".$pa['v_descripcion']."</option>";
				}
	
				$result3 = $soap->Departamento();
				$departamento = json_decode($result3->DepartamentoResult, true);
	
				$combodepartamentos="";
				foreach($departamento as $dp){
					$combodepartamentos.="<option ".$dp['v_default']." value=".$dp['i_codigo'].">".$dp['v_descripcion']."</option>";
				}
	
				$comboprovincia="<option value=0>-- SELECCIONE --</option>";
	
				$combodistrito="<option value=0>-- SELECCIONE --</option>";
	
				$result4 = $soap->PaAFP();
				$afp = json_decode($result4->PaAFPResult, true);
	
				$comboafp="";
				foreach($afp as $afp){
					$comboafp.="<option ".$afp['v_default']." value=".$afp['i_codigo'].">".$afp['v_descripcion']."</option>";
				}
	
				$result5 = $soap->PaNivelD();
				$nivelD = json_decode($result5->PaNivelDResult, true);
	
				$combonivelD="";
				foreach($nivelD as $nd){
					$combonivelD.="<option ".$nd['v_default']." value=".$nd['i_codigo'].">".$nd['v_descripcion']."</option>";
				}

				$div00 = "
				<section class='vertical-wizard'>
					<div class='bs-stepper vertical vertical-wizard-example'>
						<div class='bs-stepper-header'>
							<div id='x1' class='step' data-target='#datos-personales'>
								<button id='bt1' type='button' class='step-trigger'>
									<span class='bs-stepper-box'>1</span>
									<span class='bs-stepper-label'>
										<span class='bs-stepper-title'><i class='fas fa-user'></i> | DATOS PERSONALES</span>
									</span>
								</button>
							</div>
							<div id='x2' class='step' data-target='#hijos'>
								<button id='bt2' type='button' class='step-trigger'>
									<span class='bs-stepper-box'>2</span>
									<span class='bs-stepper-label'>
										<span class='bs-stepper-title'><i class='fas fa-child'></i> | HIJOS</span>
									</span>
								</button>
							</div>
							<div id='x3' class='step' data-target='#essalud'>
								<button id='bt3' type='button' class='step-trigger'>
									<span class='bs-stepper-box'>3</span>
									<span class='bs-stepper-label'>
										<span class='bs-stepper-title'><i class='fas fa-hospital-user'></i> | ESSALUD | AFP</span>
									</span>
								</button>
							</div>
							<div id='x4' class='step' data-target='#rtps'>
								<button id='bt4' type='button' class='step-trigger'>
									<span class='bs-stepper-box'>4</span>
									<span class='bs-stepper-label'>
										<span class='bs-stepper-title'><i class='fas fa-user-tie'></i> | RTPS</span>
									</span>
								</button>
							</div>
							<div id='x5' class='step' data-target='#declaracion'>
								<button id='bt5' type='button' class='step-trigger'>
									<span class='bs-stepper-box'>5</span>
									<span class='bs-stepper-label'>
										<span class='bs-stepper-title'><i class='fas fa-check-square'></i> | POLITICA Y TRATAMIENTO DE DATOS</span>
									</span>
								</button>
							</div>
						</div>
						<div class='bs-stepper-content'>
							<div id='datos-personales' class='content'>
								<div class='content-header'>
									<h4 class='mb-0 font-weight-bolder'>DATOS PERSONALES</h4>

									<body style='text-align: justify;'>
										<small class='text'>Rellenar todos los campos obligatorios, marcados con <b class='font-weight-bolder text-danger'>(*)</b>.</small>
									</body>
								</div>

								<div class='row'>

									<div class='form-group col-md-2'>
										<label class='form-label font-weight-bolder'>ID postulante:</label>
										<div class='input-group'>
											<input id='postulante' type='text' class='form-control' autocomplete='off' value=".$postulante.">
										</div>
									</div>

									<div class='form-group col-md-2'>
										<label class='form-label font-weight-bolder'>Codigo de publicación:</label>
										<div class='input-group'>
											<input id='publicacion' type='text' class='form-control' autocomplete='off' value=".$publicacion.">
										</div>
									</div>

									<div class='form-group col-md-4'>
										<label class='form-label font-weight-bolder'>Referencia del puesto:</label>
										<select id='puesto' class='select2 form-control form-control-lg'>
											$refpuesto
										</select>
									</div>

								</div>

								<div class='row'>

									<div class='form-group col-md-4'>
										<label class='form-label font-weight-bolder'>NOMBRES <b class='text-danger'>(*)</b></label>
										<div class='input-group'>
											<input id='nombres' type='text' class='form-control' style='text-transform:uppercase;' onkeypress='return sololetras(event)' autocomplete='off'>
											<div class='input-group-append'>
												<div class='input-group-text'><i class='fas fa-user'></i></div>
											</div>
										</div>
									</div>

									<div class='form-group col-md-4'>
										<label class='form-label font-weight-bolder'>APELLIDO PATERNO <b class='text-danger'>(*)</b></label>
										<div class='input-group'>
											<input id='paterno' type='text' class='form-control' style='text-transform:uppercase;' onkeypress='return sololetras(event)' autocomplete='off'>
											<div class='input-group-append'>
												<div class='input-group-text'><i class='fas fa-user'></i></div>
											</div>
										</div>
									</div>

									<div class='form-group col-md-4'>
										<label class='form-label font-weight-bolder'>APELLIDO MATERNO <b class='text-danger'>(*)</b></label>
										<div class='input-group'>
											<input id='materno' type='text' class='form-control' style='text-transform:uppercase;' onkeypress='return sololetras(event)' autocomplete='off'>
											<div class='input-group-append'>
												<div class='input-group-text'><i class='fas fa-user'></i></div>
											</div>
										</div>
									</div>

								</div>

								<div class='row'>

									<div class='form-group col-md-2'>
										<label class='form-label font-weight-bolder'>Fecha de nacimiento: <b class='text-danger'>(*)</b></label>
										<div class='input-group'>
											<div class='input-group-prepend'>
												<span class='input-group-text'><i class='far fa-calendar-alt'></i></span>
											</div>
											<input type='text' id='fecha' class='form-control flatpickr-basic' placeholder='YYYY-MM-DD' />
										</div>
									</div>

									<div class='form-group col-md-3'>
										<label class='form-label font-weight-bolder'>TIPO DOCUMENTO <b class='text-danger'>(*)</b></label>
										<div class='input-group'>
											<select class='form-control' id='tipodocumento'>
												$combotipodoc
											</select>
										</div>
									</div>

									<div class='form-group col-md-3'>
										<label class='form-label font-weight-bolder'>DNI / CE. <b class='text-danger'>(*)</b></label>
										<div class='input-group'>
											<input id='dni' type='text' class='form-control' onkeypress='return solonumero(event)' autocomplete='off'>
											<div class='input-group-append'>
												<div class='input-group-text'><i class='fas fa-id-card'></i></div>
											</div>
										</div>
									</div>

									<div class='form-group col-md-2'>
										<label class='form-label font-weight-bolder'>SEXO <b class='text-danger'>(*)</b></label>
										<div class='input-group'>
											<select class='form-control' id='sexo'>
												<option value='0' selected>-- SELECCIONE --</option>
												<option value='1'>MASCULINO</option>
												<option value='2'>FEMENINO</option>
											</select>
										</div>
									</div>

									<div class='form-group col-md-2'>
										<label class='form-label font-weight-bolder'>ESTADO CIVIL</label>
										<select class='form-control' id='civil' name='civil'>
											$combocivil
										</select>
									</div>

								</div>

								<div class='row'>

									<div class='form-group col-md-3'>
										<label class='form-label font-weight-bolder'>PAIS <b class='text-danger'>(*)</b></label>
										<select id='pais' class='select2 form-control form-control-lg'>
											$combopais
										</select>
									</div>

									<div class='form-group col-md-3'>
										<label class='form-label font-weight-bolder'>DEPARTAMENTO <b class='text-danger'>(*)</b></label>
										<select id='departamento' class='select2 form-control form-control-lg'>
											$combodepartamentos
										</select>
									</div>

									<div class='form-group col-md-3'>
										<label class='form-label font-weight-bolder'>PROVINCIA <b class='text-danger'>(*)</b></label>
										<select id='provincia' class='select2 form-control form-control-lg'>
											$comboprovincia
										</select>
									</div>

									<div class='form-group col-md-3'>
										<label class='form-label font-weight-bolder'>DISTRITO <b class='text-danger'>(*)</b></label>
										<select id='distrito' class='select2 form-control form-control-lg'>
											$combodistrito
										</select>
									</div>

								</div>

								<div class='row'>

									<div class='form-group col-md-12'>
										<label class='form-label font-weight-bolder'>DIRECCION ACTUAL <b class='text-danger'>(*)</b></label>
										<div class='input-group'>
											<input id='domicilio_actual' name='domicilio_actual' type='text' class='form-control' style='text-transform:uppercase;' placeholder='DIRECCIÓN...' autocomplete='off'>
											<div class='input-group-append' data-target='#domicilio_actual'>
												<div class='input-group-text'><i class='fa fa-map-marked-alt'></i></div>
											</div>
										</div>
									</div>

								</div>

								<div class='row'>

									<div class='form-group col-md-3'>
										<label class='form-label font-weight-bolder'>N° CELULAR <b class='text-danger'>(*)</b></label>
										<div class='input-group'>
											<input id='celular' name='celular' type='text' class='form-control' onkeypress='return solonumero(event)' placeholder='999888777' autocomplete='off'>
											<div class='input-group-append' data-target='#correo'>
												<div class='input-group-text'><i class='fa fa-mobile-alt'></i></div>
											</div>
										</div>
									</div>

									<div class='form-group col-md-4'>
										<label class='form-label font-weight-bolder'>CORREO PERSONAL <b class='text-danger'>(*)</b></label>
										<div class='input-group'>
											<input id='correo' name='correo' type='email' class='form-control' aria-describedby='emailHelp' placeholder='correo@ejemplo.com' autocomplete='off'>
											<div class='input-group-append' data-target='#correo'>
												<div class='input-group-text'><i class='fa fa-at'></i></div>
											</div>
										</div>
									</div>

								</div>

								<div class='d-flex justify-content-between'>
									<button class='btn btn-outline-secondary btn-prev' disabled>
										<i data-feather='arrow-left' class='align-middle mr-sm-25 mr-0'></i>
										<span class='align-middle d-sm-inline-block d-none'>Anterior</span>
									</button>
									<button class='btn btn-success btn-next'>
										<span class='align-middle d-sm-inline-block d-none'>Siguiente</span>
										<i data-feather='arrow-right' class='align-middle ml-sm-25 ml-0'></i>
									</button>
								</div>
							</div>
							<div id='hijos' class='content'>
								<div class='content-header'>
									<h4 class='mb-0 font-weight-bolder'>HIJOS</h4>

									<body style='text-align: justify;'>
										<small class='text'>Ingresar nombres y fecha de nacimiento de sus hijos, estos datos son importantes para la asignacion familiar mensual que se registrara en nuestro sistema.
											<code class='font-weight-bolder text-danger'>No incluir hijos mayores de 18 años.</code></small>
									</body>
								</div>

								<div class='row'>
									<div class='col-md-12 col-12'>
										<div class='form-group'>
											<button id='btnagregar' type='button' class='btn btn-warning'>
												<i data-feather='plus'></i><span>&nbsp;&nbsp;Agregar</span>
											</button>
										</div>
									</div>
								</div>

								<div class='row'>
									<div class='col-md-12 col-12'>
										<table id='example1' class='table table-bordered'>
											<thead class='thead-dark'>
												<tr class='text-center'>
													<th>#</th>
													<th>NOMBRES Y APELLIDOS</th>
													<th>FECHA DE NACIMIENTO</th>
													<th>EDAD</th>
													<th>#</th>
												</tr>
											</thead>
											<tbody id='tablita-hijos' class='text-center'>
											</tbody>
										</table>
									</div>
								</div>

								<br>
								<br>
								<div class='d-flex justify-content-between'>
									<button class='btn btn-success btn-prev'>
										<i data-feather='arrow-left' class='align-middle mr-sm-25 mr-0'></i>
										<span class='align-middle d-sm-inline-block d-none'>Anterior</span>
									</button>
									<button class='btn btn-success btn-next'>
										<span class='align-middle d-sm-inline-block d-none'>Siguiente</span>
										<i data-feather='arrow-right' class='align-middle ml-sm-25 ml-0'></i>
									</button>
								</div>
							</div>
							<div id='essalud' class='content'>
								<div class='content-header'>
									<h4 class='mb-0 font-weight-bolder'>ESSALUD | AFP</h4>

									<body style='text-align: justify;'>
										<small class='text'>Favor de registrar los datos para el AFP y ESSALUD.</small>
									</body>
								</div>

								<div class='row'>

									<div class='col-sm-2'>
										<div class='form-group'>
											<label class='form-label font-weight-bolder'>TIENE ESSALUD</label>
											<div class='input-group'>
												<select id='tieneseguro' class='form-control'>
													<option value='2' selected>NO</option>
													<option value='1'>SI</option>
												</select>
											</div>
										</div>
									</div>

									<div class='col-sm-4'>
										<div class='form-group'>
											<label class='form-label font-weight-bolder'>CODIGO ESSALUD <b class='font-weight-bolder text-danger'>(Si no lo sabe dejelo vacío).</b></label>
											<div class='input-group'>
												<input id='codessalud' type='text' class='form-control' style='text-transform:uppercase;' autocomplete='off'>
												<!--9211011MANAJ009-->
												<div class='input-group-append'>
													<div class='input-group-text'><i class='fas fa-hospital'></i></div>
												</div>
											</div>
										</div>
									</div>

								</div>

								<div class='row'>

									<div class='col-sm-2'>
										<div class='form-group'>
											<label class='form-label font-weight-bolder'>DOMICILIADO</label>
											<div class='input-group'>
												<select id='domiciliado' class='form-control'>
													<option value='1' selected>SI</option>
													<option value='2'>NO</option>
												</select>
											</div>
										</div>
									</div>
								</div>

								<div class='row'>

									<div class='col-sm-3'>
										<div class='form-group'>
											<label class='form-label font-weight-bolder'>AFP</label>
											<div class='input-group'>
												<select id='afp' class='form-control'>
													$comboafp
												</select>
											</div>

										</div>
									</div>

									<div class='col-sm-4'>
										<div class='form-group'>
											<label class='form-label font-weight-bolder'>COMISION AFP <b class='font-weight-bolder text-danger'>(Si no lo sabe dejelo en SELECCIONE).</b></label>
											<div class='input-group'>
												<select id='comfluapf' disabled class='form-control'>
													<option value='0' selected>-- SELECCIONE --</option>
													<option value='F'>FLUJO</option>
													<option value='S'>SALDO</option>
												</select>
											</div>
										</div>
									</div>

									<div class='col-sm-4'>
										<div class='form-group'>
											<label class='form-label font-weight-bolder'>CODIGO AFP <b class='font-weight-bolder text-danger'>(Si no lo sabe dejelo vacío).</b></label>
											<div class='input-group'>
												<input id='codafp' type='text' class='form-control' style='text-transform:uppercase;' autocomplete='off'>
												<!--639071JMNAA9-->
												<div class='input-group-append'>
													<div class='input-group-text'><i class='fas fa-user-shield'></i></div>
												</div>
											</div>
										</div>
									</div>

								</div>

								<br>
								<div class='d-flex justify-content-between'>
									<button class='btn btn-success btn-prev'>
										<i data-feather='arrow-left' class='align-middle mr-sm-25 mr-0'></i>
										<span class='align-middle d-sm-inline-block d-none'>Anterior</span>
									</button>
									<button class='btn btn-success btn-next'>
										<span class='align-middle d-sm-inline-block d-none'>Siguiente</span>
										<i data-feather='arrow-right' class='align-middle ml-sm-25 ml-0'></i>
									</button>
								</div>
							</div>
							<div id='rtps' class='content'>
								<div class='content-header'>
									<h4 class='mb-0 font-weight-bolder'>REGISTRO DE TRABAJADORES Y PRESTADORES DE SERVICIOS</h4>

									<body style='text-align: justify;'>
										<small class='text'>Recoleccion de datos del trabajor.</small>
									</body>
								</div>

								<div class='row'>

									<div class='col-sm-2'>
										<div class='form-group'>
											<label class='form-label font-weight-bolder'>REGIMEN</label>
											<div class='input-group'>
												<select id='regimen' class='form-control'>
													<option value='1' selected>PRIVADO</option>
													<option value='2'>PÚBLICO</option>
												</select>
											</div>
										</div>
									</div>

								</div>

								<div class='row'>

									<div class='form-group col-md-6'>
										<label class='form-label font-weight-bolder'>NIVEL DE EDUCACION <b class='text-danger'>(*) ejemplo: TITULADO, BACHILLER, OTROS</b></label>
										<select id='niveleducacion' class='select2 form-control form-control-lg'>
											$combonivelD
										</select>
									</div>

								</div>

								<div class='row'>

									<div class='form-group col-sm-2'>
										<label class='form-label font-weight-bolder'>DISCAPACIDAD</label>
										<select id='discapacidad' class='form-control'>
											<option value='0' selected>NO</option>
											<option value='1'>SI</option>
										</select>
									</div>

								</div>
								<br>
								<div class='d-flex justify-content-between'>
									<button class='btn btn-success btn-prev'>
										<i data-feather='arrow-left' class='align-middle mr-sm-25 mr-0'></i>
										<span class='align-middle d-sm-inline-block d-none'>Anterior</span>
									</button>
									<button class='btn btn-success btn-next'>
										<span class='align-middle d-sm-inline-block d-none'>Siguiente</span>
										<i data-feather='arrow-right' class='align-middle ml-sm-25 ml-0'></i>
									</button>
								</div>
							</div>
							<div id='declaracion' class='content'>
								<div class='content-header'>
									<h4 class='mb-0 font-weight-bolder'>POLÍTICA DE AUTORIZACIÓN PARA LA RECOPILACIÓN Y TRATAMIENTO DE DATOS PERSONAL</h4>
									<br>
									<body style='text-align: justify;'>
										<p>
										La información que <b>EL POSTULANTE / TRABAJADOR</b> proporciona a la empresa sobre su nombre, apellido, nacionalidad, estado civil, documento de
										identidad, ocupación, estudios, domicilio, correo electrónico, teléfono, estado de salud, actividades que realiza, ingresos económicos, patrimonio, gastos,
										entre otros, así como la información referida a los rasgos físicos y/o de conducta que lo identifican o lo hacen identificable, como su huella dactilar, su
										voz, etc. (datos biométricos), conforme a ley, es considerada Datos Personales. <b>EL POSTULANTE / TRABAJADOR</b> proporciona a la empresa su
										consentimiento libre, previo, expreso e informado para que sus Datos Personales sean tratados por ésta, es decir, que puedan ser recopilados,
										registrados, organizados, almacenados, conservados, elaborados, modificados, bloqueados, suprimidos, extraídos, consultados, utilizados, transferidos
										o procesados de cualquier otra forma prevista por ley.
										</p>
										<p>
										Esta autorización es indefinida y se mantendrá inclusive después de terminada el vínculo laboral que <b>EL POSTULANTE / TRABAJADOR</b> tenga o pueda
										tener con la empresa.
										</p>
										<p>
										Los Datos Personales de <b>EL POSTULANTE / TRABAJADOR</b> serán almacenados (guardados) en el Banco de Datos de Clientes del cual la empresa es titular
										o en cualquier otro que en el futuro se pueda establecer. La empresa ha adoptado las medidas necesarias para mantener segura la información.
										En conformidad con la <b>Ley 29733 y su Reglamento DS 003-2013-JUS</b>.
										</p>
									</body>

									<br>
									<body style='text-align: justify;'>
										<p>
										Declaro bajo juramento que los datos proporcionados son exactos, autorizando a efectuar las verificaciones que juzguen necesarias; así
										mismo me comprometo a presentar los documentos que me soliciten.
										</p>
									</body>

									<div class='form-check'>
										<input class='form-check-input' type='checkbox' id='acepto' name='acepto' required>
										<label class='form-check-label'>Acepto los términos y condiciones explicados anteriormente.</label>
									</div>
									
								</div>

								<br>
								<div class='d-flex justify-content-between'>
									<button class='btn btn-success btn-prev'>
										<i data-feather='arrow-left' class='align-middle mr-sm-25 mr-0'></i>
										<span class='align-middle d-sm-inline-block d-none'>Previous</span>
									</button>
									<button id='btngrabar' type='submit' class='btn btn-primary'>
										<i data-feather='save'></i><span>&nbsp;&nbsp;Guardar</span>
									</button>
								</div>
							</div>
						</div>
                    </div>
                </section>
				";

				$this->_view->div00 = $div00;

			}else{

				$div00 = "
                <section class='col-lg-12'>
                    <div class='card col-12'>
                        <div class='card-header'>
                            <h4 class='card-title'>VERDUM PERÚ S.A.C.</h4>
                        </div>
                        <div class='card-body'>
							<div class='misc-inner p-2 p-sm-3'>
								<div class='w-100 text-center'>
									<h2 class='mb-1'>PÁGINA NO ENCONTRADA</h2>
									<p class='mb-2'>
										La página a la cual esta tratando de ingresar debe haber cambiado o esta en mantenimiento.
									</p><a class='btn btn-success mb-1 btn-sm-block' href='http://localhost/reclutamiento/mispostulaciones/index'>Regresar a mis postulaciones</a>
								</div>
							</div>
						</div>
					</div>
				</section>
				";

		  		$this->_view->div00 = $div00;
			}

			$this->_view->setJs(array('fpersonal'));
			$this->_view->renderizar('fpersonal');

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function obtenerdatos() //obtener datos del postulante al cargar modal
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			function html_caracteres($string)
			{
				$string = str_replace(
					array('&amp;', '&Ntilde;', '&Aacute;', '&Eacute;', '&Iacute;', '&Oacute;', '&Uacute;'),
					array('&', 'Ñ', 'Á', 'É', 'Í', 'Ó', 'Ú'),
					$string
				);
				return $string;
			}

			$id = $_POST['id'];

			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);
			$soap = new SoapClient($wsdl, $options);

			$params = array(
				"post"			=> 2, // 7 listar personal para obtener datos
				"id"			=> $id, // se busca para obtener datos
				"publicacion" 	=> "", // vacío sin publicacion, se lista de manera masiva
				"estados"		=> 0, // 0 no se busca estado
			);

			$result = $soap->EntrevistaBDetalle($params);
			$datospostulante = json_decode($result->EntrevistaBDetalleResult, true);

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"vid" 			=> $datospostulante[0]['i_id'],
					"vpublicacion" 	=> $datospostulante[0]['v_publicacion'],
					"vtitulo" 		=> $datospostulante[0]['v_titulo'],
					"vpostulante" 	=> html_caracteres($datospostulante[0]['v_postulante']),
					"vcorreo" 		=> $datospostulante[0]['v_correo'],
					"vdescripcion" 	=> $datospostulante[0]['v_descr_finalista'],
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function notas() //cargar calendario FullCalendar
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$publicacion = $_POST['publicacion'];
			$postulacion = intval($_POST['postulacion']);

			// $publicacion = "PUB000002";
			// $postulacion = 1;

			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);

			$soap = new SoapClient($wsdl, $options);

			$params = array(
				'publicacion' 	=> $publicacion,
				"postulacion" 	=> $postulacion,
			);

			$result = $soap->Notas($params);
			$consultanotas = json_decode($result->NotasResult, true);

			$list = "";
			foreach($consultanotas as $cn){
				$list.='
				<tr>
					<td class="text-center">'.$cn['i_id'].'</td>
					<td class="text-justify">'.$cn['v_nota'].'</td>
					<td class="text-center">'.$cn['v_fecha'].'</td>
					<td class="text-center">
						<a id='.$cn['i_id'].' class="btn btn-danger btn-sm text-white deletenota">
							<i class="fas fa-trash-alt"></i>
						</a>
					</td>
				</tr>';
			}

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"data" => $list,
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function seguimiento() //seguimiento al postulante
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$id = $_POST['id'];
			$codigo = $_POST['codigo'];

			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

			$options = array(
				'uri' => $wsdl,
				'style' => SOAP_RPC,
				'use' => SOAP_ENCODED,
				'soap_version' => SOAP_1_1,
				'connection_timeout' => 60,
				'trace' => false,
				'encoding' => 'UTF-8',
				'exceptions' => false,
			);

			$soap = new SoapClient($wsdl, $options);

			$params = array(
				'publicacion' 	=> $codigo,
				"user" 			=> $id,
			);

			$result = $soap->Seguimiento($params);
			$seguimiento = json_decode($result->SeguimientoResult, true);

			$list = "";
			foreach($seguimiento as $pt){
				$list.='
				<li class="timeline-item">
					<span class="timeline-point timeline-point-success timeline-point-indicator"></span>
					<div class="timeline-event">
						<div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
							<h6>'.$pt['v_cabecera'].'</h6>
							<span class="timeline-event-time">'.$pt['d_fecha'].' - '.$pt['v_hora'].'</span>
						</div>
						<p>'.$pt['v_mensaje'].'</p>
					</div>
				</li>';
			}

			$div = '';

			$div.='
			<div class="card-body">
				<ul class="timeline">
					'.$list.'
				</ul>
			</div>
			';

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"data" => $div,
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function calendario() //cargar calendario FullCalendar
	{
		if (isset($_SESSION['usuario'])) {

			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);

			$soap = new SoapClient($wsdl, $options);

			$result = $soap->Calendario();
			$calendario = $result->CalendarioResult;

			echo $calendario;

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function datos_cita() //obtener datos de la cita del calendario FullCalendar
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$id = $_POST['id'];

			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);

			$soap = new SoapClient($wsdl, $options);

			$params = array(
				'post' 	=> 2, //consultar por id para citas del calendario
				"id" 	=> $id, //id para consulta
			);

			$result = $soap->CalendarioCita($params);
			$consultacita = json_decode($result->CalendarioCitaResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vid" 			=> $consultacita[0]['i_id'],
					"vpublicacion"	=> $consultacita[0]['v_publicacion'],
					"vtitulo" 		=> $consultacita[0]['v_titulo'],
					"vpostulacion" 	=> $consultacita[0]['i_idpostulacion'],
					"vnombre" 		=> $consultacita[0]['v_nombres'],
					"vcategoria" 	=> $consultacita[0]['i_categoria'],
					"vfinicio" 		=> $consultacita[0]['d_finicio'],
					"vffin" 		=> $consultacita[0]['d_ffin'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function mantenimiento_categoria() //mantenimiento de categoria para FullCalendar
	{
		if (isset($_SESSION['usuario'])) {
			
			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$id = $_POST['id'];
			$categoria = $_POST['categoria'];
			$color = $_POST['color'];

			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

			$options = array(
				'uri' => $wsdl,
				'style' => SOAP_RPC,
				'use' => SOAP_ENCODED,
				'soap_version' => SOAP_1_1,
				'connection_timeout' => 60,
				'trace' => false,
				'encoding' => 'UTF-8',
				'exceptions' => false,
			);

			$soap = new SoapClient($wsdl, $options);

			$params = array(
				'post' 		=> $post,
				"id" 		=> $id,
				"categoria" => $categoria,
				"color" 	=> $color,
				"user" 		=> intval($_SESSION['id']),
			);

			$result = $soap->MantCategoriaCalendario($params);
			$mantcategoria = json_decode($result->MantCategoriaCalendarioResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $mantcategoria[0]['v_icon'],
					"vtitle" 		=> $mantcategoria[0]['v_title'],
					"vtext" 		=> $mantcategoria[0]['v_text'],
					"itimer" 		=> intval($mantcategoria[0]['i_timer']),
					"icase" 		=> intval($mantcategoria[0]['i_case']),
					"vprogressbar" 	=> $mantcategoria[0]['v_progressbar'],
				)
			);
			
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function mantenimiento_notas() //mantenimiento de notas al postulante
	{
		if (isset($_SESSION['usuario'])) {
			
			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$id = $_POST['id'];
			$publicacion = $_POST['publicacion'];
			$idpostulacion = $_POST['idpostulacion'];
			$nota = $_POST['nota'];

			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

			$options = array(
				'uri' => $wsdl,
				'style' => SOAP_RPC,
				'use' => SOAP_ENCODED,
				'soap_version' => SOAP_1_1,
				'connection_timeout' => 60,
				'trace' => false,
				'encoding' => 'UTF-8',
				'exceptions' => false,
			);

			$soap = new SoapClient($wsdl, $options);

			$params = array(
				'post' 			=> $post,
				"id" 			=> $id,
				"publicacion" 	=> $publicacion,
				"idpostulacion" => $idpostulacion,
				"nota" 			=> $nota,
				"user" 			=> intval($_SESSION['id']),
			);

			$result = $soap->MantNotas($params);
			$calendariomant = json_decode($result->MantNotasResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $calendariomant[0]['v_icon'],
					"vtitle" 		=> $calendariomant[0]['v_title'],
					"vtext" 		=> $calendariomant[0]['v_text'],
					"itimer" 		=> intval($calendariomant[0]['i_timer']),
					"icase" 		=> intval($calendariomant[0]['i_case']),
					"vprogressbar" 	=> $calendariomant[0]['v_progressbar'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function mantenimiento_calendario() //mantenimiento citas calendario
	{
		if (isset($_SESSION['usuario'])) {
			
			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$id = $_POST['id'];
			$publicacion = $_POST['publicacion'];
			$idpostulacion = $_POST['idpostulacion'];
			$idcategoria = $_POST['idcategoria'];
			$descripcion = $_POST['descripcion'];
			$finicio = $_POST['finicio'];
			$ffin = $_POST['ffin'];

			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

			$options = array(
				'uri' => $wsdl,
				'style' => SOAP_RPC,
				'use' => SOAP_ENCODED,
				'soap_version' => SOAP_1_1,
				'connection_timeout' => 60,
				'trace' => false,
				'encoding' => 'UTF-8',
				'exceptions' => false,
			);

			$soap = new SoapClient($wsdl, $options);

			$params = array(
				'post' 			=> $post,
				"id" 			=> $id,
				"publicacion" 	=> $publicacion,
				"idpostulacion" => $idpostulacion,
				"idcategoria" 	=> $idcategoria,
				"descripcion" 	=> $descripcion,
				"finicio" 		=> $finicio,
				"ffin" 			=> $ffin,
				"user" 			=> intval($_SESSION['id']),
			);

			$result = $soap->MantCalendario($params);
			$calendariomant = json_decode($result->MantCalendarioResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $calendariomant[0]['v_icon'],
					"vtitle" 		=> $calendariomant[0]['v_title'],
					"vtext" 		=> $calendariomant[0]['v_text'],
					"itimer" 		=> intval($calendariomant[0]['i_timer']),
					"icase" 		=> intval($calendariomant[0]['i_case']),
					"vprogressbar" 	=> $calendariomant[0]['v_progressbar'],
				)
			);
			
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function combo_categoria() //combo categoria citas calendario
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);
			$soap = new SoapClient($wsdl, $options);

			$param = array(
				"post"		=> 1, //1 consulta para combo
			);

			$result2 = $soap->CalendarioCategoria($param);
			$calendariocombo = json_decode($result2->CalendarioCategoriaResult, true);
			
			$c=0;
			$filas="";
			foreach($calendariocombo as $dv){
				$filas.="<option value=".$dv['i_id'].">".$dv['v_categoria']."</option>";
			$c++;	
			}

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"data" => $filas,
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function combo_categoriacita() //combo categoria para citas calendario
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$categoria = $_POST['categoria'];

			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);
			$soap = new SoapClient($wsdl, $options);

			$param = array(
				"post"		=> 1, //1 consulta para combo
			);

			$result2 = $soap->CalendarioCategoria($param);
			$calendariocb = json_decode($result2->CalendarioCategoriaResult, true);
			
			$filas="";
			$cat="selected";

			foreach($calendariocb as $dv){
				if ($dv['i_id'] === $categoria){
					$filas.="<option value=".$dv['i_id']." selected='".$cat."'>".$dv['v_categoria']."</option>";
				} else {
					$filas.="<option value=".$dv['i_id'].">".$dv['v_categoria']."</option>";
				}
			}

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"data" => $filas,
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function mantenimiento_finalista()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");

			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$cod = $_POST['cod'];
			$finalista = $_POST['finalista'];
			$comentario = $_POST['comentario'];
			$nompostulante = $_POST['nompostulante']; 	//NOMBRE DEL POSTULANTE
			$puesto = $_POST['puesto'];					//PUESTO
			$publicacion = $_POST['publicacion'];		//POSTULACION PUB000001

			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);
			$soap = new SoapClient($wsdl, $options);

			$params = array(
				"post"			=> $post,
				"id"			=> $cod,
				"finalista"		=> $finalista,
				"comentario"	=> $comentario,
				"nompostulante"	=> $nompostulante,
				"puesto"		=> $puesto,
				"publicacion"	=> $publicacion,
				"user"			=> $_SESSION['id'],
			);

			$result = $soap->MantFinalista($params);
			$finalista = json_decode($result->MantFinalistaResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $finalista[0]['v_icon'],
					"vtitle" 		=> $finalista[0]['v_title'],
					"vtext" 		=> $finalista[0]['v_text'],
					"itimer" 		=> intval($finalista[0]['i_timer']),
					"icase" 		=> intval($finalista[0]['i_case']),
					"vprogressbar" 	=> $finalista[0]['v_progressbar'],
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function consulta_usuario()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST["post"];
			$id = $_POST["id"];
			$puesto = $_POST["puesto"];

			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);
			$soap = new SoapClient($wsdl, $options);

			$param = array(
				"post" => $post,
				"codigo" => $id,
			);

			$result = $soap->Usuarios($param);
			$usuarios = json_decode($result->UsuariosResult, true);

			$result1 = $soap->ConsultaMensajeFinalista();
			$asunto = json_decode($result1->ConsultaMensajeFinalistaResult, true);

			$result2 = $soap->ConsultaMensajeFinalista();
			$mensaje = json_decode($result2->ConsultaMensajeFinalistaResult, true);

			$datoprw = str_replace('< br >','<br>',$mensaje[0]['v_mensaje']);

			// para consultar y traer los cc de correos predeterminados
			$param1 = array(
				"post" 		=> 6, //correos de los selected
				"codigo" 	=> 1,
			);

			$result = $soap->Usuarios($param1);
			$cccorreos = json_decode($result->UsuariosResult, true);

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"vnombre" 	=> $usuarios[0]['v_nombres'],
					"vcorreo" 	=> $usuarios[0]['v_correo'],
					"vasunto"	=> str_replace('[CARGO]',$puesto,$asunto[0]['v_asunto']),
					"vmensaje"	=> str_replace('[CARGO]',$puesto,$datoprw),
					"imensaje"	=> $mensaje[0]['i_mensaje'],
					"cccorreo"	=> $cccorreos,
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function combocorreos()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST["post"];
			$id = $_POST["id"];

			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);
			$soap = new SoapClient($wsdl, $options);

			$param = array(
				"post" => $post,
				"codigo" => $id,
			);

			$result = $soap->Usuarios($param);
			$combousuarios = json_decode($result->UsuariosResult, true);

			$combocc="";
			foreach($combousuarios as $dv){
				$combocc.="<option ".$dv['v_selected']." value=".$dv['v_codigo']." idcorreo=".$dv['v_correo'].">".$dv['v_nombres']."</option>";
			};
			
			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"data" => $combocc,
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function enviarcorreo()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
	
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();
	
			$cid = $_POST['cid'];
			$cnombre = $_POST['cnombre'];
			$cpara = $_POST['cpara'];
			$ccopia = $_POST['ccopia'];
			$casunto = $_POST['casunto'];
			$cmensaje = $_POST['cmensaje'];
	
			// $cnombre = "JOSEPH MAGALLANES";
			// $cpara = "programador.app02@verdum.com";
			// $ccopia = ['2','4','6'];
			// $casunto = "PRUEBA";
			// $cmensaje = "CORREO DE PRUEBA";
			
			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';
			
			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);
	
			$soap = new SoapClient($wsdl, $options);

			$result2 = $soap->ConfiguracionCorreo();
			$conficorreo = json_decode($result2->ConfiguracionCorreoResult, true);	
			
			$output = 0;
			// envio de correo
			$this->getLibrary('phpmailer/PHPMailer');
			$this->getLibrary('phpmailer/SMTP');
	
			$mail = new PHPMailer;
	
			$mail->isSMTP();
			$mail->SMTPDebug = false;
			$mail->SMTPAuth = true; //Habilita uso de usuario y contraseña
			//$mail->SMTPSecure = 'tls'; //tls o ssl, configuracion de correo personalizado Ejem: gmail (ssl)
			$mail->Mailer = 'smtp';
			$mail->Host = $conficorreo[0]['v_servidor_entrante']; //mail.cafealtomayo.com.pe
			$mail->Username = $conficorreo[0]['v_correo_salida']; //reportes@cafealtomayo.com.pe
			$mail->Password = $conficorreo[0]['v_password']; //rpt4m2020
			$mail->Port = $conficorreo[0]['i_puerto']; //25
	
			// $mail->From = ('reportes@cafealtomayo.com.pe');
			$mail->From = ($conficorreo[0]['v_correo_salida']); //reportes@cafealtomayo.com.pe
			$mail->FromName = $conficorreo[0]['v_nombre_salida']; // VERDUM PERÚ SAC
			$mail->addAddress($cpara, $cnombre);
			// $mail->addReplyTo('reportes@cafealtomayo.com.pe', 'noreplay verdum');
			
			// concatenar los correos en copia
			$i = 0;
			$cccorreos = "";
			$cncopia = "";
			foreach ($ccopia as $di) {
				$params[$i] = array(
					"post" 		=> 2,
					"codigo" 	=> $di,
				);
				$result = $soap->Usuarios($params[$i]);
				$usuario = json_decode($result->UsuariosResult, true);
				$cccorreos = $usuario[0]['v_correo'];
				$cncopia = $usuario[0]['v_correo'].';'.$cncopia;
				$mail->addCC($cccorreos);
				$i++;
			}
			// $mail->addBCC('bcc@example.com');
	
			$mail->isHTML(true);
			$mail->CharSet = "utf-8";
			$mail->Subject = $casunto;
			$mail->Body = "
			Hola <b>" . $cnombre . ",</b>
			<br>
			<br>
			". $cmensaje;
	
			$output = 0;
	
			if (!$mail->send()) {
				$output = 0; //	ERROR AL ENVIAR CORREO
	
				$params = array(
					'id'		=> $cid,
					"nombre" 	=> $cnombre,
					"asunto"   	=> $casunto,
					"copia"   	=> $cncopia,
					"mensaje"   => $cmensaje,
					"output"   	=> $output,
					"ruta"   	=> 'CORREO ENTREVISTA - ERROR',
					"user" 		=> $_SESSION['id'],
				);
	
				$result = $soap->MantLogCorreos($params);
	
			} else {
				$output = 1; // SE ENVIO CORRECTAMENTE
	
				$params = array(
					'id'		=> $cid,
					"nombre" 	=> $cnombre,
					"asunto"   	=> $casunto,
					"copia"   	=> $cncopia,
					"mensaje"   => $cmensaje,
					"output"   	=> $output,
					"ruta"   	=> 'CORREO ENTREVISTA - SUCCESS',
					"user" 		=> $_SESSION['id'],
				);
	
				$result = $soap->MantLogCorreos($params);
			}
	
			header('Content-type: application/json; charset=utf-8');
	
			echo $json->encode(
				array(
					"correo" => $output,
				)
			);

		}else {
			$this->redireccionar('index/logout');
		}
	}

	public function agradecimiento() //obtener datos para poder enviar correo de agradecimiento a los demas
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$publicacion = $_POST['publicacion'];

			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);
			
			$params = array(
				"post"			=> 3, // para consultar por publicacion, que ya exista un finalista y poder mandar correo a los demas
				"id"			=> 0, // se busca para obtener datos
				"publicacion" 	=> $publicacion, // publicacion, se lista de manera agrupada
				"estados"		=> 0, // 0 no se busca estado
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->EntrevistaBDetalle($params);
			$datospostulante = json_decode($result->EntrevistaBDetalleResult, true);

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"data" 	=> count($datospostulante),
				)
			);
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function subir_archivo()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			if (is_array($_FILES) && count($_FILES) > 0) {

				$fecha_hora = date("Ymd_His", time()); // varible concatenando fecha y hora
				$publicacion = $_POST['publicacion']; // codigo de postulación
				// $puesto = $_POST['puesto']; // nombre del puesto
				$codigo = $_POST['codigo']; // codigo del postulacion (no es id de login)
				// $postulante = $_POST['postulante']; //nombre postulante
				$descripcion = $_POST['descripcion']; //nombre postulante
				$extdoc = explode("/",$_FILES["archivo"]["type"]); // extraemos el tipo de archivo que se va a cargar
				$post = $_POST['post']; // post para mantenimiento

				$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

				$options = array(
					"uri" => $wsdl,
					"style" => SOAP_RPC,
					"use" => SOAP_ENCODED,
					"soap_version" => SOAP_1_1,
					"connection_timeout" => 60,
					"trace" => false,
					"encoding" => "UTF-8",
					"exceptions" => false,
				);
				$soap = new SoapClient($wsdl, $options);
	
				$params = array(
					"modulo"	=> 'entrevista', // 
					"mime"		=> $extdoc[0], // image / application --> mime clasificado por php
					"type"		=> $extdoc[1], // jpeg / pdf / msword --> tipo de archivo clasificado por php input file
				);
	
				$result = $soap->ConsultaTipoArchivo($params);
				$tipoarchivo = json_decode($result->ConsultaTipoArchivoResult, true);

				// consultamos si el archivo es permitido en el sistema
				if (count($tipoarchivo)>0){
					// consultamos si el size del archivo no es mayor que el configurado en la BD
					if ($_FILES['archivo']['size'] <= $tipoarchivo[0]['v_size']){
						if ($extdoc[0] == $tipoarchivo[0]['v_mime'] && $extdoc[1] == $tipoarchivo[0]['v_type']){

							// especificamos la ruta en donde se guardar el archivo
							// $destino = "public/doc/archivos/".$fecha_hora.'_'.$codigo.".".$extdoc[1];							
							$destino = "public/doc/archivos/".$publicacion.'_'.$codigo.'_'.$fecha_hora.".".$tipoarchivo[0]['v_archivo'];

							if (move_uploaded_file($_FILES["archivo"]["tmp_name"], $destino)) {

								// INSERTAMOS LOS DATOS
								$params = array(
									"post"			=> $post, // insert
									"id"			=> 0, // id de la tabla reg_postulacion_archivos
									"postulante"	=> $codigo,	// identity de la tabla postulacion
									"publicacion"	=> $publicacion, // PUB000001
									"ruta"			=> $destino, // ruta de guardado de archivo
									"descripcion"	=> $descripcion, // descripcion del archivo
									"archivo"		=> $tipoarchivo[0]['v_archivo'], // tipo de archivo para luego mostrarlo en icono
									"mime"			=> $extdoc[0], // image / application --> mime clasificado por php
									"type"			=> $extdoc[1], // jpeg / pdf / msword --> tipo de archivo clasificado por php input file
									"size"			=> $_FILES['archivo']['size'], // 
									"user"			=> $_SESSION['id'], // usuario quien carga archivo
								);
					
								$result = $soap->MantArchivosPostulados($params);
								$mantarchivo = json_decode($result->MantArchivosPostuladosResult, true);

								header('Content-type: application/json; charset=utf-8');
								echo $json->encode(
									array(
										"vicon" 		=> $mantarchivo[0]['v_icon'],
										"vtitle" 		=> $mantarchivo[0]['v_title'],
										"vtext" 		=> $mantarchivo[0]['v_text'],
										"itimer" 		=> intval($mantarchivo[0]['i_timer']),
										"icase" 		=> intval($mantarchivo[0]['i_case']),
										"vprogressbar" 	=> $mantarchivo[0]['v_progressbar'],
									)
								);
							}else{
								header('Content-type: application/json; charset=utf-8');
								echo $json->encode(
									array(
										"vicon" 		=> "error",
										"vtitle" 		=> "Error al subir archivo al servidor",
										"vtext" 		=> "Ocurrio un error al cargar el archivo, favor de volver a intentarlo..!!",
										"itimer" 		=> "3000",
										"icase" 		=> "5",
										"vprogressbar" 	=> true,
									)
								);
							}
						}else{
							header('Content-type: application/json; charset=utf-8');
							echo $json->encode(
								array(
									"vicon" 		=> "error",
									"vtitle" 		=> "Error tipo archivo",
									"vtext" 		=> "Tipo de archivo no admitido para la subida",
									"itimer" 		=> "2000",
									"icase" 		=> "6",
									"vprogressbar" 	=> true,
								)
							);
						}
					}else{
						header('Content-type: application/json; charset=utf-8');
						echo $json->encode(
							array(
								"vicon" 		=> "error",
								"vtitle" 		=> "Error en tamaño de archivo",
								"vtext" 		=> "Archivo es demasiado grande a lo permitido, debe ser menor a ".($tipoarchivo[0]['v_size']/1000000)." mb.",
								"itimer" 		=> "4000",
								"icase" 		=> "7",
								"vprogressbar" 	=> true,
							)
						);
					}
				}else{
					header('Content-type: application/json; charset=utf-8');
					echo $json->encode(
						array(
							"vicon" 		=> "error",
							"vtitle" 		=> "Error archivo no reconocido",
							"vtext" 		=> "Archivo no configurado en la base de datos...!!!",
							"itimer" 		=> "2000",
							"icase" 		=> "8",
							"vprogressbar" 	=> true,
						)
					);
				}

			} else {
				header('Content-type: application/json; charset=utf-8');
				echo $json->encode(// archivo no existe
					array(
						"vicon" 		=> "error",
						"vtitle" 		=> "Archivo de origen no encontrado",
						"vtext" 		=> "Favor de volver a intentar subir un archivo...!!!",
						"itimer" 		=> "3000",
						"icase" 		=> "9",
						"vprogressbar" 	=> true,
					)
				);
			}
		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function listar_archivos()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$codigo = $_POST['codigo']; // codigo del postulacion (no es id de login)
			$postulacion = $_POST['postulacion']; // codigo de postulación (PUB000001)

			// $codigo = 1;
			// $postulacion = 'PUB000001';

			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);
			$soap = new SoapClient($wsdl, $options);

			// LEEMOS LOS DATOS INSERTADOS Y LOS MOSTRAMOS EN LA TABLA
			$params1 = array(
				"postulacion"	=> $codigo,	// identity de la tabla postulacion
				"publicacion"	=> $postulacion, // PUB000001
				"modulo"		=> "entrevista", // modulo
			);

			$result1 = $soap->ConsultaArchivosPostulados($params1);
			$listaarchivos = json_decode($result1->ConsultaArchivosPostuladosResult, true);

			$filas = "";
			foreach($listaarchivos as $da){
				$filas.= '
				<tr>
					<td class="text-center">'.$da['i_id'].'</td>
					<td class="text-center">'.$da['v_descripcion'].'</td>
					<td class="text-center">
						<a class="btn btn-'.$da['v_color'].' btn-sm" target="_blank" href='.BASE_URL . $da['v_ruta'].'>
							<i class="'.$da['v_icono'].'"></i>
						</a>
					</td>
					<td class="text-center">'.$da['v_fecha'].'</td>
					<td class="text-center">
						<a id='.$da['i_id'].' vruta='.$da['v_ruta'].' class="btn btn-danger btn-sm text-white deletearchivo">
							<i class="fas fa-trash-alt"></i>
						</a>
					</td>
				</tr>';
			}

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"filas" => $filas,
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function mantenimiento_archivo()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$id = $_POST['id'];
			$publicacion = $_POST['publicacion'];
			$codigo = $_POST['codigo'];
			$ruta = $_POST['ruta'];

			if (unlink($ruta)) {

				$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

				$options = array(
					"uri" => $wsdl,
					"style" => SOAP_RPC,
					"use" => SOAP_ENCODED,
					"soap_version" => SOAP_1_1,
					"connection_timeout" => 60,
					"trace" => false,
					"encoding" => "UTF-8",
					"exceptions" => false,
				);
				$soap = new SoapClient($wsdl, $options);

				$params = array(
					"post"			=> $post, // insert
					"id"			=> $id, // id de la tabla reg_postulacion_archivos
					"postulante"	=> $codigo,	// identity de la tabla postulacion
					"publicacion"	=> $publicacion, // PUB000001
					"ruta"			=> "", // ruta de guardado de archivo
					"descripcion"	=> "", // descripcion del archivo
					"archivo"		=> "", // tipo de archivo para luego mostrarlo en icono
					"mime"			=> "", // image / application --> mime clasificado por php
					"type"			=> "", // jpeg / pdf / msword --> tipo de archivo clasificado por php input file
					"size"			=> 0, // 
					"user"			=> $_SESSION['id'], // usuario quien carga archivo
				);

				$result = $soap->MantArchivosPostulados($params);
				$mantarchivo = json_decode($result->MantArchivosPostuladosResult, true);

				header('Content-type: application/json; charset=utf-8');
				echo $json->encode(
					array(
						"vicon" 		=> $mantarchivo[0]['v_icon'],
						"vtitle" 		=> $mantarchivo[0]['v_title'],
						"vtext" 		=> $mantarchivo[0]['v_text'],
						"itimer" 		=> intval($mantarchivo[0]['i_timer']),
						"icase" 		=> intval($mantarchivo[0]['i_case']),
						"vprogressbar" 	=> $mantarchivo[0]['v_progressbar'],
					)
				);

			  } else {

				header('Content-type: application/json; charset=utf-8');
				echo $json->encode(
					array(
						"vicon" 		=> 'error',
						"vtitle" 		=> 'Archivo no encontrado',
						"vtext" 		=> 'No se encontro archivo en la base de datos, favor de volver a intentar...!!',
						"itimer" 		=> 4000,
						"icase" 		=> 5,
						"vprogressbar" 	=> true,
					)
				);

			  }
		
		}else{
			$this->redireccionar('index/logout');
		}
	}

	public function cargar_provincia()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$departamento = $_POST['departamento'];

			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);

			$param = array(
				"departamento" => $departamento,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->Provincia($param);
			$provincia = json_decode($result->ProvinciaResult, true);
			
			$filas="";
			foreach($provincia as $dv){
				$filas.="<option value=".$dv['i_codigo'].">".$dv['v_descripcion']."</option>";
			};

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"data" => $filas,
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function cargar_distritos()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$provincia = $_POST['provincia'];

			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);

			$param = array(
				"provincia" => $provincia,
			);

			$soap = new SoapClient($wsdl, $options);
			$result = $soap->Distrito($param);
			$distrito = json_decode($result->DistritoResult, true);

			$filas="";
			foreach($distrito as $dv){
				$filas.="<option value=".$dv['i_codigo'].">".$dv['v_descripcion']."</option>";
			}

			header('Content-type: application/json; charset=utf-8');
			echo $json->encode(
				array(
					"data" => $filas,
				)
			);

		} else {
			$this->redireccionar('index/logout');
		}
	}

	public function mantenimiento_personal()
	{
		if (isset($_SESSION['usuario'])) {

			putenv("NLS_LANG=SPANISH_SPAIN.AL32UTF8");
			putenv("NLS_CHARACTERSET=AL32UTF8");
			
			$this->getLibrary('json_php/JSON');
			$json = new Services_JSON();

			$post = $_POST['post'];
			$postulante = $_POST['postulante'];
			$publicacion = $_POST['publicacion'];
			$puesto = $_POST['puesto'];
			$nombres = $_POST['nombres'];
			$paterno = $_POST['paterno'];
			$materno = $_POST['materno'];
			$fecha = $_POST['fecha'];
			$tipodocumento = $_POST['tipodocumento'];
			$dni = $_POST['dni'];
			$sexo = $_POST['sexo'];
			$civil = $_POST['civil'];
			$pais = $_POST['pais'];
			$departamento = $_POST['departamento'];
			$provincia = $_POST['provincia'];
			$distrito = $_POST['distrito'];
			$domicilio_actual = $_POST['domicilio_actual'];
			$celular = $_POST['celular'];
			$correo = $_POST['correo'];
			$datoshijos = $_POST['datoshijos']; //array hijos
			$tieneseguro = $_POST['tieneseguro'];
			$codessalud = $_POST['codessalud'];
			$domiciliado = $_POST['domiciliado'];
			$afp = $_POST['afp'];
			$comfluapf = $_POST['comfluapf'];
			$codafp = $_POST['codafp'];
			$regimen = $_POST['regimen'];
			$niveleducacion = $_POST['niveleducacion'];
			$discapacidad = $_POST['discapacidad'];
			$acepto = $_POST['acepto'];

			$wsdl = 'http://localhost:81/RSWEB/WSReclutamiento.asmx?WSDL';

			$options = array(
				"uri" => $wsdl,
				"style" => SOAP_RPC,
				"use" => SOAP_ENCODED,
				"soap_version" => SOAP_1_1,
				"connection_timeout" => 60,
				"trace" => false,
				"encoding" => "UTF-8",
				"exceptions" => false,
			);

			$soap = new SoapClient($wsdl, $options);

			if(sizeof($datoshijos) != 0){
				// array de hijos
				$i = 0;
				foreach ($datoshijos as $di) {
					$params[$i] = array(
						'post'		=> $post,
						'dnipadre'	=> $dni,
						'nombre'	=> $di['nombre'],
						'fecha' 	=> $di['fecha'],
						'edad' 		=> $di['edad'],
						'user' 		=> intval($_SESSION['id']),
					);
					$soap->MantPersonalHijos($params[$i]);
					$i++;
				}
			}

			// datos personal
			$params = array(
				'post' 				=> $post,
				'postulante'		=> $postulante,
				'publicacion' 		=> $publicacion,
				'puesto' 			=> $puesto,
				'nombre' 			=> $nombres,
				'paterno' 			=> $paterno,
				'materno' 			=> $materno,
				'fnacimiento' 		=> $fecha,
				'tipodocumento' 	=> $tipodocumento,
				'dni' 				=> $dni,
				'sexo' 				=> $sexo,
				'civil' 			=> $civil,
				'pais' 				=> $pais,
				'departamento' 		=> $departamento,
				'provincia' 		=> $provincia,
				'distrito' 			=> $distrito,
				'domicilio' 		=> $domicilio_actual,
				'celular' 			=> $celular,
				'correo' 			=> $correo,
				'iessalud' 			=> $tieneseguro,
				'vessalud' 			=> $codessalud,
				'domiciliado' 		=> $domiciliado,
				'afp' 				=> $afp,
				'comfluapf' 		=> $comfluapf,
				'codafp' 			=> $codafp,
				'regimen' 			=> $regimen,
				'niveleducacion' 	=> $niveleducacion,
				'discapacidad' 		=> $discapacidad,
				'acepto' 			=> $acepto,
				'user'				=> intval($_SESSION['id']),
			);

			$result2 = $soap->MantPersonal($params);
			$personalA = json_decode($result2->MantPersonalResult, true);

			header('Content-type: application/json; charset=utf-8');

			echo $json->encode(
				array(
					"vicon" 		=> $personalA[0]['v_icon'],
					"vtitle" 		=> $personalA[0]['v_title'],
					"vtext" 		=> $personalA[0]['v_text'],
					"itimer" 		=> intval($personalA[0]['i_timer']),
					"icase" 		=> intval($personalA[0]['i_case']),
					"vprogressbar" 	=> $personalA[0]['v_progressbar'],
				)
			);
		
		}else{
			$this->redireccionar('index/logout');
		}
	}
}
?>