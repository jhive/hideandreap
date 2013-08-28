define(['ash', 'components/player' ], function(Ash, Player){
	
	var PlayerNode = Ash.Node.create({
		player:Player						
	});

	return PlayerNode;
});