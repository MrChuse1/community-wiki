CoD.MyWidget = InheritFrom( LUI.UIElement )
CoD.MyWidget.new = function ( menu, controller )
	local self = LUI.UIElement.new()

	if PreLoadFunc then
		PreLoadFunc( self, controller )
	end

	self:setUseStencil( false )
	self:setClass( CoD.MyWidget )
	self.id = "MyWidget"
	self.soundSet = "default"
	self:setLeftRight( true, false, 0, 1280 )
	self:setTopBottom( true, false, 0, 720 )
	self.anyChildUsesUpdateState = true

	self.MyElement = LUI.UIImage.new()
	self.MyElement:setLeftRight( true, false, 0, 100 )
	self.MyElement:setTopBottom( true, false, 0, 100 )
	self.MyElement:setImage( RegisterImage( "$white" ) )
	self:addElement( self.MyElement )

	LUI.OverrideFunction_CallOriginalSecond( self, "close", function ( element )
		element.MyElement:close()
	end )
	
	if PostLoadFunc then
		PostLoadFunc( self, controller, menu )
	end
	
	return self
end