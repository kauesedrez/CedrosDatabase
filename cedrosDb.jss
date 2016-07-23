	/***
	[cdoc]
	#autor: Winetu Kaue Sedrez Bilhalva
	#name: Database Class
	#obs: https://msdn.microsoft.com/en-us/library/hww8txat(v=vs.84).aspx - documentação 
	***/

	/*
	[init block]
	#desc: testa se a jquery está funcionando
	*/
	if(typeof $ == "undefined") {
		document.write("<h1>Cedros Database</h1><h2>Hello Folks! It Works.</h2><h3>More? <a target='_blank' href='http://www.cedrosdev.com.br'>Cedros Development</a></h3><hr />");
		document.write("<h3>[!] Atenção [!] - Está faltando a jquery!</h3><hr />");
		}
	/* [end block] */
	
	
	/*
	[init block]
	#name: teste de compatibilidade
	*/
	$(function(){
	
		try{
		
			fso = new ActiveXObject("Scripting.FileSystemObject");
		
		} catch(e) {
		
			document.write("O site não foi adicionado aos sites confiáveis<hr>Vá em Ferramentas>Opções da Internet>Segurança>Sites Confiáveis>sites>Adicionar este site a zona>Adicionar<p>Nessa versão o sistema funciona apenas no Internet Explorer<p>Erro Original<p><i>"+e.message);
		
		}
		
		
	
	});
	
	
	/***
	[init function]
	#name: Database()
	***/
	var CedrosDatabase = function() {
	
		var valor=[];
		this.numLines=[];
		this.numLins;
		this.numCols=[];
		
		
		this.table_;
		this.database_;
		/** define com qual tabela o objeto irá trabalhar permanentemente **/
		
		// ------------------------------------------------------------------------------------------------
		
		/***
		[init function]
		#name:escreve();
		***/
		
			this.escreve = function(x){
			$("#output").append(x+"<p>");
			}
		
		/***
		[end function]
		***/
		
		// ------------------------------------------------------------------------------------------------

		/***
		[init block]
		#name: trims
		***/
			this.trim = function(str) {
				return str.replace(/^\s+|\s+$/g,"");
				
			}
			//left trim
			this.ltrim=function(str) {
				
				return str.replace(/^\s+/,"");
				
			}
			//right trim
			this.rtrim = function(str) {
				
				return str.replace(/\s+$/,"");
			}
		/***
		[end block]
		***/
		
		// ------------------------------------------------------------------------------------------------	
			
		/* [init function]
		#name: itWorks();
		*/
			this.itWorks = function() {
			
				document.write("<h1>Cedros Database</h1><h2>Hello Folks! It Works.</h2><h3>More? <a target='_blank' href='http://www.cedrosdev.com.br'>Cedros Development</a></h3><hr />");
				
							
				//testa o path
				if(typeof PATH == 'undefined') {
				
						document.write("<h3>[!] Atenção [!] - Está faltando o path.txt !</h3><hr />");
						
						
				}
				
				else {
				
						document.write("<h3>Ótimo, tudo parece ter sido configurado corretamente. Não esqueça das barras no final do path.txt ;) </h3><hr /> Leia a documentação do CBD em cedrosdev.com.br/cdb/docs");
				
				}
					
				
			}
		/* [end function] */			
			
			
		/***
		[init function]
		#name: getWhen();
		***/
	
		this.getWhen = function (retorno_,coluna_,valor_){
		/** get nome(retorno_) when categoria(coluna_)=advogado(valor_) , retorna apenas uma ocorrencia**/
			
			
			
			var fso = new ActiveXObject("Scripting.FileSystemObject");
			var file = fso.OpenTextFile(PATH+this.database_+"\\"+this.table_+".cdb",1);
			if (file.AtEndOfStream)
			   arquivoOriginal="";
			else
			   arquivoOriginal=file.ReadAll();
			file.Close();
			
			//arquivoOriginal retem todo o arquivo de banco de dados
			this.numLines=arquivoOriginal.split("\n");
			
			
			
			for(a=0;a<this.numLines.length;a++) {
				valor[a]=this.numLines[a].split("|-$-|");
			}
			
			//###################################################################################
			
			
		
			
			
			
			getWhenConfirm1=false;
			getWhenConfirm2=false;
			
				//tenho que descobrir em que this.numLines categoria=advogado
				
				for(i=0;i<valor[0].length;i++){
				/** valor[0].length retem o total de colunas da nossa tabela **/
				
					//GET telefone
					if(this.trim(valor[0][i])==coluna_){
						
						numCol=i;
						/** numero da coluna passada no parametro retorno **/
						getWhenConfirm1=true;
									
					}	
					
				}
				if(!getWhenConfirm1){
				
					return "getWhen Error (01): A coluna '"+coluna_+"' não existe na tabela "+this.table_;
					
				}
				
				
					//max
				if(valor_ == "max") {
				
					var tt=0;
				
					for(i=1;i<this.numLines.length;i++){
					/** começa em 1 por 0 é o nome da coluna e não o valor a ser computado **/
				
						hh=parseInt(this.trim(valor[i][numCol]));
						
						if(i==1)tt=hh;
						
						if(hh>tt)tt=hh;
						
						
						
						
						
					}
					
					return tt;
				
				}
				
					//min
				if(valor_ == "min") {
				
					var tt=0;
				
					for(i=1;i<this.numLines.length;i++){
						
						
						
						hh=parseInt(this.trim(valor[i][numCol]));
						
						if(i==1)tt=hh;
						
						if(hh<tt)tt=hh;
						
					}
					
					return tt;
				
				}
				
				
				
				for(i=0;i<this.numLines.length;i++){
				
					if(this.trim(valor[i][numCol])==valor_) {
					
						numLin=i;
						getWhenConfirm2=true;
					
					}
				
				}
				
				if(!getWhenConfirm2){
				
					return "getWhen Error (01): O valor '"+valor_+"' não foi localizado na coluna '"+coluna_+"' da tabela "+this.table_;
					
				}
				
				this.numCols=valor[0].length;
				return this.get(retorno_,numLin);		
			
			}
		/***
		[end function]
		***/
		
		// ------------------------------------------------------------------------------------------------
		
		/***
		[init function]
		#name: get();
		***/
		
			this.get = function (coluna,linha){

			getConfirm=false;
			for(asx=0;asx<valor[0].length;asx++){
				if(this.trim(valor[0][asx])==coluna){
					return valor[linha][asx];
					getConfirm=true;
				}
			}
			if(!getConfirm) {
			
				return "get Error (01): A coluna '"+coluna+"' não existe na tabela "+this.table_;
				
			}
			
		}
		/***
		[end function]
		***/
		
		
		// ------------------------------------------------------------------------------------------------
		
		/***
		[init function]
		#name : getWhere
		#desc: get from fornecedores where categoria=desenvolvimento
				get from table_ where coluna_=valor_
		***/
		
			this.getWhere = function(coluna_,valor_,modificador_) {
			
			var testGetwhere1=false;
			
			valor = [];
			
			
				var fso = new ActiveXObject("Scripting.FileSystemObject");
				var file = fso.OpenTextFile(PATH+this.database_+"\\"+this.table_+".cdb",1);
				if (file.AtEndOfStream)
				   arquivoOriginal="";
				else
				   arquivoOriginal=file.ReadAll();
				file.Close();
				
				//arquivoOriginal retem todo o arquivo de banco de dados
				this.numLines=arquivoOriginal.split("\n");
				
				
				
				for(a=0;a<this.numLines.length;a++) {
					valor[a]=this.numLines[a].split("|-$-|");
				}
					
					//primeiro devemos achar as this.numLiness onde categoria=desenvolvimento
					
					for(i=0;i<valor[0].length;i++){
					/** valor[0].length retem o total de colunas da nossa tabela **/
				
					//GET telefone
					if(this.trim(valor[0][i])==coluna_){
						
						numCol=i;
						/** numero da coluna passada no parametro retorno **/
						
						testGetwhere1=true;
										
						}	
					
					}
					if(!testGetwhere1) {
					
						document.write("getWhere Fatal Error: A coluna "+coluna_+" não existe na tabela "+this.table_);
						return void(0);
					
					}
					
					if(modificador_==">") {
						
						numLin = [];
						a=0;
						for(i=0;i<this.numLines.length;i++){
						
						if(parseInt(this.trim(valor[i][numCol]))>parseInt(valor_)) {
						a++;
							numLin[a]=i;
							/** numLin.length agora retem o total de matches **/
							//a++;
							
						
							}
						
						}
						
					}
					else if(modificador_==">=") {
						
						numLin = [];
						a=0;
						for(i=0;i<this.numLines.length;i++){
						
						if(parseInt(this.trim(valor[i][numCol]))>=parseInt(valor_)) {
						a++;
							numLin[a]=i;
							/** numLin.length agora retem o total de matches **/
							//a++;
							
						
							}
						
						}
						
					}
					else if(modificador_=="<") {
						
						numLin = [];
						a=0;
						for(i=0;i<this.numLines.length;i++){
						
						if(parseInt(this.trim(valor[i][numCol]))<parseInt(valor_)) {
						a++;
							numLin[a]=i;
							/** numLin.length agora retem o total de matches **/
							//a++;
							
						
							}
						
						}
						
					}else if(modificador_=="<=") {
						
						numLin = [];
						a=0;
						for(i=0;i<this.numLines.length;i++){
						
						if(parseInt(this.trim(valor[i][numCol]))<=parseInt(valor_)) {
						a++;
							numLin[a]=i;
							/** numLin.length agora retem o total de matches **/
							//a++;
							
						
							}
						
						}
						
					}
					
					else {
						numLin = [];
						a=0;
						for(i=0;i<this.numLines.length;i++){
						
						if(this.trim(valor[i][numCol])==valor_) {
							
							a++;
							numLin[a]=i;
							/** numLin.length agora retem o total de matches **/
							//a++;
							
						
							}
						
						}
					}
					
				
				
					
					//alert(numLin.length +"|"+ numLin[0] +"|"+ numLin[1]);
					//alert(this.numLines.length);
					//agora já sei que tenho que pegar todas as informações da this.numLines 4 e 5
					//preciso jogar cada informação dentro de uma variavel ou array que possa ser tratada
					
					/*
						total = get from fornecedores where categoria=desenvolvimento
						
						for (i=0;i<total;i++) {
						
							nome=total.nome[i];
							telefone=total.telefone[i];
							
							write(nome + telefone);
						}
						
						total==numthis.numLines.length
					
					*/
					
			this.numCols=valor[0].length;		
			this.numLins=numLin.length-1;
			if(this.numLins<0)this.numLins=0;
			return numLin;
			}
			
		/***
		[end function]
		***/
		
		// ------------------------------------------------------------------------------------------------
		
		/* [init function]
		#name: getAll()
		#desc: seleciona toda tabela e retorna um array bidimensional com todos os dados puros
		#return: array bidimensional valor
		*/
		this.getAll = function(coluna_,valor_,modificador_) {
		
			if(coluna_){
			
				resultado = this.getWhere(coluna_,valor_,modificador_);
			
			}
			else {
			
				resultado = this.getWhere("LINE","0",">=");
						
			}
			return valor;
		
		}
		/* [end function] */
		
		// ------------------------------------------------------------------------------------------------
		
		/***
		[init function]
		#name: showTable();
		#desc: Mostra toda estrutura da tabela em uma div flutuante;
		***/
		
		var showTableControle=true;
		
		this.showTable = function() {
		
			
		
			output_="<input type='button' value=' X ' onClick=\"$('#divOutput').fadeOut('slow')\"><h2>Show Table</h2>Tabela: "+this.table_+"<p>";
			output_+="<table id='tableOutput'>";
			
			
			resultado = this.getWhere("LINE","0",">=");
			
			
			
			for(lpo=0;lpo<this.numLines.length;lpo++) {
			
				output_+="<tr>";
			
				for(lpi=0;lpi<valor[0].length;lpi++) {
				
					if(lpi==0) output_+="<td><b>"+valor[lpo][lpi]+"</b></td>";
					else output_+="<td>"+valor[lpo][lpi]+"</td>";
				
				}
				
				output_+="</tr>";
			
			}
			
			output_+="</table>";

			
			if(showTableControle) {
				//primeira vez
				$('body').append("<div id='divOutput'></div>");
				$('#divOutput').html(output_);
				showTableControle=false;
			}
			else{
				//apenas atualiza a div
				$('#divOutput').html(output_).fadeIn('slow');
			}
			
			
			$("#divOutput").css("position","absolute").css("backgroundColor","#eee").css("top",20).css("left",20).css("width","900").css("height","400").css("overflow","auto").css("padding",10).css("margin",10).css("borderColor","red").css("borderBottomWidth","5").css("fontFamily","Calibri");
			
			$("#tableOutput td").css("fontFamily","Courier New").css("fontSize","12px").css("borderBottom", "1px solid #ddd").css("borderLeft", "1px solid #ddd").css("padding","5px");
			
			
		}
		
		
		/***
		[end function]
		***/
		
		// ------------------------------------------------------------------------------------------------
		
		/***
		[init function]
		#name: insert();
		#desc: insert into table values("..","..");
		***/
		
		
		

		this.insert = function(params,html) {
		
			var str="";
		
			if(html==true) {
			
				for (i=0; i<params.length; i++) {
					
					params[i]=params[i].toString().replace(/\n/g,"<br />");
				
				}
			
			}
		
			for (i=0; i<params.length; i++) {
				if(i==params.length-1){
				
					str+=params[i];
					
				}
				else {
				
					str+=params[i]+"|-$-|";
				
				}
			}
			
			LINE = this.getWhen(null,"LINE","max")+1;
			
			str="\n"+LINE+"|-$-|"+str;
			
			//escreve a nova this.numLines no arquivo
			
			var fso = new ActiveXObject("Scripting.FileSystemObject");
			var file = fso.OpenTextFile(PATH+this.database_+"\\"+this.table_+".cdb",8,-1,0);
			file.Write(str);
			file.Close();
			
			

			
		}
		
		/***
		[end function]
		***/
		
		// ------------------------------------------------------------------------------------------------
		
		/*** [init function]
		#name: update();
		#desc: update nome(coluna1_)='Black'(valor1_) when id(coluna2_)=6(valor2_)
		o modificador é opcional para >=,<=,>,< ; se nao for definido será igual
		o modificar serve apenas para colunas numericas
		***/
		
		this.update = function(coluna1_,valor1_,coluna2_,valor2_,modificador) {
		
			// --> explode
				var fso = new ActiveXObject("Scripting.FileSystemObject");
				var file = fso.OpenTextFile(PATH+this.database_+"\\"+this.table_+".cdb",1);
				if (file.AtEndOfStream)
				   arquivoOriginal="";
				else
				   arquivoOriginal=file.ReadAll();
				file.Close();			
				//arquivoOriginal retem todo o arquivo de banco de dados
				this.numLines=arquivoOriginal.split("\n");			
				for(a=0;a<this.numLines.length;a++) {
					valor[a]=this.numLines[a].split("|-$-|");
				}
			// <-- explode
			
			
			// --> descobre a coluna nome
				for(i=0;i<valor[0].length;i++){
			
				if(this.trim(valor[0][i])==coluna1_){
					
					numCol1=i;
								
					}	
				
				}
				// numCol1 retem o numero da coluna 'nome'	
			
				for(i=0;i<valor[0].length;i++){
			
					if(this.trim(valor[0][i])==coluna2_){
					
						numCol2=i;
								
					}	
				
				}
				//numCol2 retem o numero da coluna 'id'
			
			// <-- descobre a coluna nome
			
			
			
			// --> remonta o arquivo
				var resultadoUpdate="";
				for(g=0;g<this.numLines.length;g++) {
				
					if(modificador==">") {
						for(u=0;u<valor[0].length;u++) {
						
							//remonta a this.numLines
							if(u==numCol2) {
							
								if(parseInt(this.trim(valor[g][numCol2]))>parseInt(valor2_)) {
									valor[g][numCol1]=valor1_;
									
								}
							
							}
							
						}
					}
					else if(modificador=="<") {
						for(u=0;u<valor[0].length;u++) {
						
							//remonta a this.numLines
							if(u==numCol2) {
							
								if(parseInt(this.trim(valor[g][numCol2]))<parseInt(valor2_)) {
									valor[g][numCol1]=valor1_;
									
								}
							
							}
							
						}
					}
					else if(modificador==">=") {
						for(u=0;u<valor[0].length;u++) {
						
							//remonta a this.numLines
							if(u==numCol2) {
							
								if(parseInt(this.trim(valor[g][numCol2]))>=parseInt(valor2_)) {
									valor[g][numCol1]=valor1_;
									
								}
							
							}
							
						}
					}
					else if(modificador=="<=") {
						for(u=0;u<valor[0].length;u++) {
						
							//remonta a this.numLines
							if(u==numCol2) {
							
								if(parseInt(this.trim(valor[g][numCol2]))<=parseInt(valor2_)) {
									valor[g][numCol1]=valor1_;
									
								}
							
							}
							
						}
					}
					else {
						for(u=0;u<valor[0].length;u++) {
						
							//remonta a this.numLines
							if(u==numCol2) {
							
								if(this.trim(valor[g][numCol2])==valor2_) {
									valor[g][numCol1]=valor1_;
									
								}
							
							}
							
						}
					}
					
					for(u=0;u<valor[0].length;u++) {
					
						if((u==(valor[0].length-1))&&(g==(this.numLines.length-1))){
						/** ultima this.numLines e coluna **/
						
							resultadoUpdate+=valor[g][u];
						
						}
						else if(u==(valor[0].length-1)) {
						/** ultima coluna **/
							resultadoUpdate+=valor[g][u]+"\n";
						}
						
						else {
						
							resultadoUpdate+=valor[g][u]+"|-$-|";
						
						}
					}
					
					
					
					
				
				}
				
				
			// <-- remonta o arquivo
			
			
			// --> grava o arquivo
				var fso = new ActiveXObject("Scripting.FileSystemObject");
				var file = fso.OpenTextFile(PATH+this.database_+"\\"+this.table_+".cdb",2,-1,0);
				file.Write(resultadoUpdate);
				file.Close();			
			// <-- grava o arquivo
			
		
		}
		/***
		[end function]
		***/
		 
		// ------------------------------------------------------------------------------------------------
		
		/*** [init function]
		#name: erase();
		#desc: erase e-mail when id=002
		***/
		
		this.erase = function(coluna1_,coluna2_,valor_,modificador) {
		
			if(modificador==undefined)
				this.update(coluna1_,"",coluna2_,valor_);
			else	
				this.update(coluna1_,"",coluna2_,valor_,modificador);
		
		}
		
		
		/*** [end function] ***/
		
		// ------------------------------------------------------------------------------------------------

		/*** [init function]
		#name:	delete
		#desc: 	deleta uma this.numLines inteira do banco de dados
				delete when id=004
		***/
			
		this.del = function(coluna_,valor_,modificador) {
		
			// --> explode
				var fso = new ActiveXObject("Scripting.FileSystemObject");
				var file = fso.OpenTextFile(PATH+this.database_+"\\"+this.table_+".cdb",1);
				if (file.AtEndOfStream)
				   arquivoOriginal="";
				else
				   arquivoOriginal=file.ReadAll();
				file.Close();			
				//arquivoOriginal retem todo o arquivo de banco de dados
				this.numLines=arquivoOriginal.split("\n");			
				for(a=0;a<this.numLines.length;a++) {
					valor[a]=this.numLines[a].split("|-$-|");
				}
			// <-- explode
			
			if(this.numLines.length>0) {
			
				// --> descobre a coluna 
					for(i=0;i<valor[0].length;i++){
				
					if(this.trim(valor[0][i])==coluna_){
						
						numCol=i;
									
						}	
					
					}
				// <-- descobre a coluna
				
				// --> remonta o arquivo
				var resDelete="";
				for(g=0;g<this.numLines.length;g++) {
					
							
					//remonta a this.numLines
					
					
					switch(modificador) {
					
						default:
							if(valor[g][numCol]!=valor_) {
							
								resDelete+=this.numLines[g]+"\n";
								
							}
						break;
						
						case ">":
							if(g==0) {
								
									resDelete+=this.numLines[g]+"\n";
								
							
							} else {
						
								if(parseInt(valor[g][numCol])<=parseInt(valor_)) {
								
									
										resDelete+=this.numLines[g]+"\n";
									
								}
							}
							
						
						break;
						
						case ">=":
						
							if(g==0) {
								
									resDelete+=this.numLines[g]+"\n";
								
							
							} else {
						
								if(parseInt(valor[g][numCol])<parseInt(valor_)) {
								
									
										resDelete+=this.numLines[g]+"\n";
									
								}
							}
						
						
						break;
						
						case "<":
						
							if(g==0) {
									
									resDelete+=this.numLines[g]+"\n";
								
							
							} else {
						
								if(parseInt(valor[g][numCol])>=parseInt(valor_)) {
								
									
										resDelete+=this.numLines[g]+"\n";
									
								}
							}
						
						
						break;
						
						case "<=":
						
							if(g==0) {
								
									resDelete+=this.numLines[g]+"\n";
															
							
							} else {
						
								if(parseInt(valor[g][numCol])>parseInt(valor_)) {
								
									
										resDelete+=this.numLines[g]+"\n";
									
								}
							}
						
						
						break;
						
					}
							
					
				}
						
				// <-- remonta o arquivo
				
				// --> grava o arquivo
					if(resDelete.substring((resDelete.length-1),resDelete.length)=="\n")resDelete=resDelete.substring(0,(resDelete.length - 1));
					var fso = new ActiveXObject("Scripting.FileSystemObject");
					var file = fso.OpenTextFile(PATH+this.database_+"\\"+this.table_+".cdb",2,-1,0);
					file.Write(resDelete);
					file.Close();			
				// <-- grava o arquivo
				
				
				
				
				// --> corrige a coluna LINE
				
					// --> explode
						var fso = new ActiveXObject("Scripting.FileSystemObject");
						var file = fso.OpenTextFile(PATH+this.database_+"\\"+this.table_+".cdb",1);
						if (file.AtEndOfStream)
						   arquivoOriginal="";
						else
						   arquivoOriginal=file.ReadAll();
						file.Close();			
						//arquivoOriginal retem todo o arquivo de banco de dados
						this.numLines=arquivoOriginal.split("\n");			
						for(a=0;a<this.numLines.length;a++) {
							valor[a]=this.numLines[a].split("|-$-|");
						}
					// <-- explode
					
					resultadoUpdate="";
					
					for(j=0;j<this.numLines.length;j++) { 
					
						for(k=0;k<valor[0].length;k++) { 
						
							if(k==0) {
							
								if(j==0) 	resultadoUpdate+="LINE|-$-|";
								else		resultadoUpdate+=j+"|-$-|";
							
							}
							else {
								
								if(k==(valor[0].length-1)) resultadoUpdate+=valor[j][k];
								else resultadoUpdate+=valor[j][k]+"|-$-|";
							
							}
						}
						resultadoUpdate+="\n";
					}
					//remove o ultimo \n
					if(resultadoUpdate.substring((resultadoUpdate.length-1),resultadoUpdate.length)=="\n")resultadoUpdate=resultadoUpdate.substring(0,(resultadoUpdate.length - 1));
			
				// <-- corrige a coluna LINE
				
				// --> grava o arquivo
					var fso = new ActiveXObject("Scripting.FileSystemObject");
					var file = fso.OpenTextFile(PATH+this.database_+"\\"+this.table_+".cdb",2,-1,0);
					file.Write(resultadoUpdate);
					file.Close();			
				// <-- grava o arquivo
			}
		}
			
		
		/*** [end function] ***/
		
		
		// --------------------------------------------------------------------|
		// MODULO CDBMyAdmin --------------------------------------------------|
		// Neste modulo a formula muda, agora o banco deve ser passado por ----|
		// parâmetro, e não mais por variável estática ------------------------|
		// --------------------------------------------------------------------|
		
		/* [init function]
		#name: 		getDatabases();
		#desc: 		usa a função GetFolder para listar todos os subfolders dentro do path PATH.
					usa a função Enumerator para listar todos 
					usa o for (; !fc.atEnd(); fc.moveNext()) para varrer os subfolders
					fc.item() retem o caminho completo
					fc.item().name retem apenas o nome do folder
		#return:	Retorno um array com o nome de todos os folders: bds[];
		*/
		
		this.getDatabases = function() {
		var dbs = [];
			var fso = new ActiveXObject("Scripting.FileSystemObject");
			f = fso.GetFolder(PATH);			
			
				fc=new Enumerator(f.SubFolders);
				s = 0;
				for (; !fc.atEnd(); fc.moveNext())
				{
				  dbs[s]=fc.item().name;
				  s++;				  
				}
			return dbs;
		}
		
		/* [end function] */
		
		
		/* [init function]
		#name:		getTables()
		#desc:		Usa GetBaseName em Enumerator(f.files) para listar o nome de cada arquivo .cdb dentro do banco de dados 'db'
		#pars:		string db -> O banco de dados (pasta) selecionado
		#return:	array tbs contendo o nome simples - sem extensão - de cada arquivo dentro da pasta db
		*/
		this.getTables = function(db) {
		var tbs = [];
			var fso = new ActiveXObject("Scripting.FileSystemObject");
			f = fso.GetFolder(PATH+"\\"+db+"\\");
			fc=new Enumerator(f.files);
				s = 0;
				for (; !fc.atEnd(); fc.moveNext())
				{
				  tbs[s]=fso.GetBaseName(fc.item());
				  s++;				  
				}
			return tbs;
		}
		/* [end function] */
		
		/* [init function]
		#name:		renameTable();
		#desc:		renomeia a tabela tb passado como parametro para newName
		#pars:		string db-->banco , string tb-->tabela, string newName-->novo nome da tabela
		#return :	true;
		*/
		this.renameTable = function(db,tb,newName) {
		
			var fso = new ActiveXObject("Scripting.FileSystemObject");
			f = fso.GetFile(PATH+"\\"+db+"\\"+tb+".cdb");
			f.name=newName+".cdb";
			return true;
		
		}
		/* [end function] */
		
		/* [init function]
		#name:		renameDatabase();
		#desc:		renomeia o banco de dados (pasta) passada por parâmetro
		#pars:		string db-->banco, string newName-->novo nome do banco de dados
		#return :	true;
		*/
		this.renameDatabase = function(db,newName) {
		
			var fso = new ActiveXObject("Scripting.FileSystemObject");
			f = fso.GetFolder(PATH+"\\"+db+"\\");
			
			f.name=newName;
			
			return true;
				
		}
		/* [end function] */
		
		/* [init function]
		#name: 		deleteDatabase()
		*/
		this.deleteDatabase = function(db) {
		
			var fso = new ActiveXObject("Scripting.FileSystemObject");
			f = fso.GetFolder(PATH+"\\"+db);
			fso.DeleteFolder(f);
			return true;
		
		}
		/* [end function] */
		
		
		/* [init function]
		#name:		deleteTable();
		*/
		this.deleteTable = function(db,tb){
		
			var fso = new ActiveXObject("Scripting.FileSystemObject");
			f = fso.GetFile(PATH+"\\"+db+"\\"+tb+".cdb");
			fso.deleteFile(f);
			return true;
		
		}
		/* [end function] */
		
		
		/* [init function]
		#name: createTable();
		*/
		this.createTable = function(tb,colunas) {
		
			var fso = new ActiveXObject("Scripting.FileSystemObject");
			
			try{
				f=fso.CreateTextFile(PATH+conexao.database_+"\\"+tb+".cdb",false);
				f.Write("LINE|-$-|"+colunas.replace(/,/g,"|-$-|"));
				f.Close();
				return "ok";
			}
			catch(e){
				return "<hr>Erro: Não foi possivel criar a tabela. Ela já existe?<br>Erro original: "+e.message+"<hr>";
			}	
		
		}
		/* [end function] */
			
	/***
	[init function]
	#name: createDatabase();
	***/
	
		this.createDatabase = function(db) {
		
			var fso = new ActiveXObject("Scripting.FileSystemObject");
				
				try{
					f=fso.CreateFolder(PATH+db)
					return "ok";
				}
				catch(e){
						return "<hr>Erro: Não foi possivel criar o banco de dados. Ele já existe?<br>Erro original: "+e.message+"<hr>";
				}
		
		}
		
	}
	/***
	[end function]
	***/
	

	
	
	// valor[0][0] retem os valores do banco de dados
	//valor[0][1],[0][2],[0][3] retem os nomes das colunas
	//valor[1][0],[2][0],[3][0] retem o numero da this.numLines
	//this.numLines.length retem o total de this.numLiness do banco de dados
	//valor[0].length retem o total de colunas do banco de dados
	
	
	

	
	
	
	
	
	
	
	
	
	

	


